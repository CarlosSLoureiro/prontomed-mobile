import { DataSource, FindOneOptions, In, Like, Repository } from 'typeorm';

import Paciente from '@entity/Paciente';

import PacientesRepositoryInterface from './interface';

import { FiltrosDeBuscarPacientesContrato } from './types';

export default class PacientesRepository implements PacientesRepositoryInterface {
  private readonly repository: Repository<Paciente>;

  constructor (database: DataSource) {
    this.repository = database.getRepository(Paciente);
  }

  public async encontrar (opcoes: FindOneOptions<Paciente>): Promise<Paciente | undefined> {
    return await this.repository.findOne(opcoes) ?? undefined;
  }

  public async listar (pagina: number, quantidade: number, filtros: FiltrosDeBuscarPacientesContrato): Promise<Array<Paciente>> {
    let where = {};
    const order = { [filtros.ordenacao.chave]: filtros.ordenacao.ordem.toLowerCase() === 'decrescente' ? 'DESC' : 'ASC' };

    if (filtros?.busca !== undefined) {
      const busca = filtros.busca;

      if (busca.nome.length > 0) {
        where = {
          ...where,
          nome: Like(`%${busca.nome}%`)
        };
      }

      if (busca.generos.length > 0) {
        where = {
          ...where,
          genero: In(busca.generos)
        };
      }

      if (busca.tiposSanguineos.length > 0) {
        where = {
          ...where,
          tipoSanguineo: In(busca.tiposSanguineos)
        };
      }
    }

    return await this.repository.find({
      where,
      order,
      relations: ['consultas'],
      take: quantidade,
      skip: quantidade * pagina
    });
  }

  public async total (): Promise<number> {
    return await this.repository.count();
  }

  public async cadastrar (dados: Partial<Paciente>): Promise<Paciente> {
    const paciente = this.repository.create(dados);

    dados.dataAtualizacao = dados.dataCriacao = new Date();

    return await this.repository.save(paciente);
  }

  public async editar (paciente: Partial<Paciente>): Promise<Paciente> {
    paciente.dataAtualizacao = new Date();
    return await this.repository.save(paciente);
  }

  public async excluir (paciente: Paciente): Promise<Paciente> {
    return await this.repository.remove(paciente);
  }
}
