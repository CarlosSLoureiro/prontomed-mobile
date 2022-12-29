import { Repositories } from '@database';
import Consulta from '@entity/Consulta';
import ConsultasRepositoryInterface from '@repository/Consultas/interface';

import ObservacoesUtils from '@utils/Observacoes';

export default class ReabrirConsultasHelper {
  private readonly repository: ConsultasRepositoryInterface;
  public readonly tamanhoMinimoNome = 3;

  constructor (repository: ConsultasRepositoryInterface = (global.repositories as Repositories).consultasRepository) {
    this.repository = repository;
  }

  public async executar (consulta: Partial<Consulta>): Promise<Consulta> {
    consulta.finalizada = false;
    const consultaEditada = await this.repository.editar(consulta);

    await ObservacoesUtils.cadastrar('Consulta reaberta', [consultaEditada]);

    return consultaEditada;
  }
}
