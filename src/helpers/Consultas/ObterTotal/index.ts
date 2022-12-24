import { Repositories } from '@database';
import ConsultasRepositoryInterface from '@repository/Consultas/interface';

import { TiposDeTotal } from './types';

export default class ObterTotalConsultasHelper {
  private readonly repository: ConsultasRepositoryInterface;

  constructor (repository: ConsultasRepositoryInterface = (global.repositories as Repositories).consultasRepository) {
    this.repository = repository;
  }

  public async executar (tipo?: TiposDeTotal): Promise<number> {
    switch (tipo) {
      case 'agendadas': return await this.repository.totalAgendadas();
      case 'atrasadas': return await this.repository.totalAtrasadas();
      default: return await this.repository.total();
    }
  }
}
