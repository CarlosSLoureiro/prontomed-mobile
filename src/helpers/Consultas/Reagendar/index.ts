import { Repositories } from '@database';
import Consulta from '@entity/Consulta';
import { Generos } from '@entity/Paciente/enums';
import ConsultasRepositoryInterface from '@repository/Consultas/interface';

import ConsultaEmConflitoError from '@errors/ConsultaEmConflito';

import CalendarioUtils from '@utils/Calendario';
import ObservacoesUtils from '@utils/Observacoes';

import moment from 'moment';

export default class ReagendarConsultasHelper {
  private readonly repository: ConsultasRepositoryInterface;

  constructor (repository: ConsultasRepositoryInterface = (global.repositories as Repositories).consultasRepository) {
    this.repository = repository;
  }

  public async executar (consulta: Consulta, ignorarConflito = false): Promise<Consulta> {
    const possivelConsultaEmConflito = await this.repository.obterPossivelConsultaEmConflito(consulta.dataAgendada, [consulta.id]);

    if (possivelConsultaEmConflito !== undefined && !ignorarConflito) {
      throw new ConsultaEmConflitoError(`Você já possui uma consulta agendada para o dia ${moment(possivelConsultaEmConflito.dataAgendada).format('DD/MM/YYYY [as] HH[h]mm')} com ${possivelConsultaEmConflito.paciente.genero === Generos.FEMININO ? 'a' : 'o'} paciente ${possivelConsultaEmConflito.paciente.nome}`);
    }

    await CalendarioUtils.removerConsulta(consulta);
    const evento = await CalendarioUtils.agendarConsulta(consulta);

    consulta.evento = evento;
    consulta.dataAtualizacao = new Date();

    const consultaEditada = await this.repository.editar(consulta);

    await ObservacoesUtils.cadastrar(
      `Consulta reagendada para ${moment(consulta.dataAgendada).format('DD/MM/YYYY [as] HH[h]mm')}`,
      [consultaEditada]
    );

    return consultaEditada;
  }
}
