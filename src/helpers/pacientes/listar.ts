import { Repositories } from '@database';
import Paciente from '@entity/paciente';
import PacientesRepositoryInterface from '@repository/pacientes/interface';

export default class ListarPacientesHelper {
  private readonly repository: PacientesRepositoryInterface;

  constructor (repository: PacientesRepositoryInterface = (global.repositories as Repositories).pacientesRepository) {
    this.repository = repository;
  }

  public async run (pagina: number): Promise<Array<Paciente>> {
    return await this.repository.getAll(pagina);
  }
}
