import { Repositories } from '@database';
import Consulta from '@entity/Consulta';
import ConsultasRepositoryInterface from '@repository/Consultas/interface';

import CalendarioUtils from '@utils/Calendario';
import ObservacoesUtils from '@utils/Observacoes';

export default class FinalizarConsultasHelper {
  private readonly repository: ConsultasRepositoryInterface;
  public readonly tamanhoMinimoNome = 3;

  constructor (repository: ConsultasRepositoryInterface = (global.repositories as Repositories).consultasRepository) {
    this.repository = repository;
  }

  public async executar (consulta: Partial<Consulta>): Promise<Consulta> {
    const evento = await CalendarioUtils.removerConsulta(consulta as Consulta);

    consulta.finalizada = true;
    consulta.evento = evento;

    const consultaEditada = await this.repository.editar(consulta);

    await ObservacoesUtils.cadastrar('Consulta finalizada', [consultaEditada]);

    return consultaEditada;
  }
}
