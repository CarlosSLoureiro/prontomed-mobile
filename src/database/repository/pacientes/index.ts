import { DataSource, Repository } from 'typeorm';

import Paciente from '@entity/paciente';

import PacientesRepositoryInterface from './interface';

export default class PacientesRepository implements PacientesRepositoryInterface {
  private readonly repository: Repository<Paciente>;

  constructor (database: DataSource) {
    this.repository = database.getRepository(Paciente);
  }

  public async getAll (): Promise<Array<Paciente>> {
    const queryBuilder = this.repository.createQueryBuilder('pacientes');
    queryBuilder.leftJoinAndSelect('pacientes.consultas', 'consultas');

    return await queryBuilder.getMany();
  }

  public async create ({ nome }: Partial<Paciente>): Promise<Paciente> {
    const paciente = this.repository.create({
      nome
    });

    await this.repository.save(paciente);

    return paciente;
  }

  public async delete (id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
