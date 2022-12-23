import { Repositories } from '@database';
import ConsultasRepositoryInterface from '@repository/Consultas/interface';

export default class ObterTotalConsultasHelper {
  private readonly repository: ConsultasRepositoryInterface;

  constructor (repository: ConsultasRepositoryInterface = (global.repositories as Repositories).consultasRepository) {
    this.repository = repository;
  }

  public async executar (): Promise<number> {
    return await this.repository.total();
  }
}
