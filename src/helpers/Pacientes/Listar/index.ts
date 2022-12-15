import { Repositories } from '@database';
import Paciente from '@entity/Paciente';
import PacientesRepositoryInterface from '@repository/Pacientes/interface';

export default class ListarPacientesHelper {
  private readonly repository: PacientesRepositoryInterface;

  constructor (repository: PacientesRepositoryInterface = (global.repositories as Repositories).pacientesRepository) {
    this.repository = repository;
  }

  public async executar (pagina: number): Promise<Array<Paciente>> {
    return await this.repository.getAll(pagina);
  }
}
