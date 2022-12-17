import { Repositories } from '@database';
import Paciente from '@entity/Paciente';
import PacientesRepositoryInterface from '@repository/Pacientes/interface';
import { FiltrosDeBuscarPacientesContrato } from '@repository/Pacientes/types';

export default class ListarPacientesHelper {
  private readonly repository: PacientesRepositoryInterface;

  constructor (repository: PacientesRepositoryInterface = (global.repositories as Repositories).pacientesRepository) {
    this.repository = repository;
  }

  public async executar (pagina: number, filtros: FiltrosDeBuscarPacientesContrato): Promise<Array<Paciente>> {
    return await this.repository.listar(pagina, filtros);
  }
}
