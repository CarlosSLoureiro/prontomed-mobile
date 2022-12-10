import { Repositories } from '@database';
import PacientesRepositoryInterface from '@repository/Pacientes/interface';

export default class ObterTotalPacientesHelper {
  private readonly repository: PacientesRepositoryInterface;

  constructor (repository: PacientesRepositoryInterface = (global.repositories as Repositories).pacientesRepository) {
    this.repository = repository;
  }

  public async run (): Promise<number> {
    return await this.repository.total();
  }
}
