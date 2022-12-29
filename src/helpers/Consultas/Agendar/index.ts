import { Repositories } from '@database';
import Consulta from '@entity/Consulta';
import Paciente from '@entity/Paciente';
import { Generos } from '@entity/Paciente/enums';
import ConsultasRepositoryInterface from '@repository/Consultas/interface';

import ConsultaEmConflitoError from '@errors/ConsultaEmConflito';

import CalendarioUtils from '@utils/Calendario';
import ObservacoesUtils from '@utils/Observacoes';

import moment from 'moment';

export default class AgendarConsultasHelper {
  private readonly repository: ConsultasRepositoryInterface;

  constructor (repository: ConsultasRepositoryInterface = (global.repositories as Repositories).consultasRepository) {
    this.repository = repository;
  }

  public async executar (paciente: Paciente, data: Date, ignorarConflito = false): Promise<Consulta> {
    const possivelConsultaEmConflito = await this.repository.obterPossivelConsultaEmConflito(data);

    if (possivelConsultaEmConflito !== undefined && !ignorarConflito) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      throw new ConsultaEmConflitoError(`Você já possui uma consulta agendada para o dia ${moment(possivelConsultaEmConflito.dataAgendada).format('DD/MM/YYYY [as] HH[h]mm')} com ${possivelConsultaEmConflito.paciente.genero === Generos.FEMININO ? 'a' : 'o'} paciente ${possivelConsultaEmConflito.paciente.nome}`);
    }

    const consulta = await this.repository.agendar(paciente, data);

    const evento = await CalendarioUtils.agendarConsulta(consulta);

    if (evento !== undefined) {
      consulta.evento = evento;

      await this.repository.editar(consulta);
    }

    await ObservacoesUtils.cadastrar('Consulta cadastrada', [consulta]);

    return consulta;
  }
}
