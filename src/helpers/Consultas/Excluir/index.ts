import { Repositories } from '@database';
import Consulta from '@entity/Consulta';
import ConsultasRepositoryInterface from '@repository/Consultas/interface';

import CalendarioUtils from '@utils/Calendario';

export default class ExcluirConsultasHelper {
  private readonly repository: ConsultasRepositoryInterface;

  constructor (repository: ConsultasRepositoryInterface = (global.repositories as Repositories).consultasRepository) {
    this.repository = repository;
  }

  public async executar (consulta: Consulta): Promise<Consulta> {
    await CalendarioUtils.removerConsulta(consulta, true);

    return await this.repository.excluir(consulta);
  }
}
