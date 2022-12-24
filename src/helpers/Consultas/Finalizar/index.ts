import { Repositories } from '@database';
import Consulta from '@entity/Consulta';
import ConsultasRepositoryInterface from '@repository/Consultas/interface';

export default class FinalizarConsultasHelper {
  private readonly repository: ConsultasRepositoryInterface;
  public readonly tamanhoMinimoNome = 3;

  constructor (repository: ConsultasRepositoryInterface = (global.repositories as Repositories).consultasRepository) {
    this.repository = repository;
  }

  public async executar (consulta: Partial<Consulta>): Promise<Consulta> {
    consulta.finalizada = true;
    return await this.repository.editar(consulta);
  }
}
