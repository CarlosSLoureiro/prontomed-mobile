import { Repositories } from '@database';
import ConsultasRepositoryInterface from '@repository/Consultas/interface';
import { StatusPacientes } from '@repository/Consultas/types';

export default class ObterStatusPacientesConsultasHelper {
  private readonly repository: ConsultasRepositoryInterface;

  constructor (repository: ConsultasRepositoryInterface = (global.repositories as Repositories).consultasRepository) {
    this.repository = repository;
  }

  public async executar (): Promise<StatusPacientes> {
    return await this.repository.obterStatusPacientes(1);
  }
}
