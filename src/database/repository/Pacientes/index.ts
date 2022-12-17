import { DataSource, In, Like, Repository } from 'typeorm';

import Paciente from '@entity/Paciente';

import PacientesRepositoryInterface from './interface';

import { FiltrosDeBuscarPacientesContrato } from './types';

export default class PacientesRepository implements PacientesRepositoryInterface {
  private readonly repository: Repository<Paciente>;

  constructor (database: DataSource) {
    this.repository = database.getRepository(Paciente);
  }

  public async total (): Promise<number> {
    return await this.repository.count();
  }

  public async listar (pagina: number, filtros: FiltrosDeBuscarPacientesContrato): Promise<Array<Paciente>> {
    const rows = 10;

    const queryBuilder = this.repository.createQueryBuilder('pacientes');

    queryBuilder.addSelect(subQuery => {
      return subQuery
        .select('COUNT(c.id)', 'totalConsultas')
        .from('consultas', 'c')
        .where('c.paciente = pacientes.id');
    }, 'totalConsultas');

    if (filtros?.busca !== undefined) {
      const busca = filtros.busca;

      if (busca.nome.length > 0) {
        queryBuilder.andWhere({ nome: Like(`%${busca.nome}%`) });
      }

      if (busca.generos.length > 0) {
        queryBuilder.andWhere({ genero: In(busca.generos) });
      }

      if (busca.tiposSanguineos.length > 0) {
        queryBuilder.andWhere({ tipoSanguineo: In(busca.tiposSanguineos) });
      }
    }

    queryBuilder.orderBy(filtros.ordenacao.chave, filtros.ordenacao.ordem.toLowerCase() === 'decrescente' ? 'DESC' : 'ASC');
    queryBuilder.offset(rows * pagina).limit(rows);

    queryBuilder.leftJoinAndSelect('pacientes.consultas', 'consultas');

    return await queryBuilder.getMany();
  }

  public async cadastrar (dados: Partial<Paciente>): Promise<Paciente> {
    const paciente = this.repository.create(dados);

    dados.dataAtualizacao = dados.dataCriacao = new Date();

    return await this.repository.save(paciente);
  }

  public async deletar (id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
