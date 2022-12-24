import { Repositories } from '@database';
import Consulta from '@entity/Consulta';
import ConsultasRepositoryInterface from '@repository/Consultas/interface';

export default class ExcluirConsultasHelper {
  private readonly repository: ConsultasRepositoryInterface;

  constructor (repository: ConsultasRepositoryInterface = (global.repositories as Repositories).consultasRepository) {
    this.repository = repository;
  }

  public async executar (consulta: Consulta): Promise<Consulta> {
    return await this.repository.excluir(consulta);
  }
}
