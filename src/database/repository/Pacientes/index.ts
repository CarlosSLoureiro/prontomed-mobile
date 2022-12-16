import { DataSource, Repository } from 'typeorm';

import Paciente from '@entity/Paciente';

import PacientesRepositoryInterface from './interface';

export default class PacientesRepository implements PacientesRepositoryInterface {
  private readonly repository: Repository<Paciente>;

  constructor (database: DataSource) {
    this.repository = database.getRepository(Paciente);
  }

  public async total (): Promise<number> {
    return await this.repository.count();
  }

  public async listar (pagina: number): Promise<Array<Paciente>> {
    const rows = 10;

    const queryBuilder = this.repository.createQueryBuilder('pacientes')
      .orderBy('pacientes.id', 'DESC')
      .offset(rows * pagina)
      .limit(rows);

    queryBuilder.leftJoinAndSelect('pacientes.consultas', 'consultas');
    return await queryBuilder.getMany();
  }

  public async cadastrar (dados: Partial<Paciente>): Promise<Paciente> {
    const paciente = this.repository.create(dados);

    await this.repository.save(paciente);

    return paciente;
  }

  public async deletar (id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
