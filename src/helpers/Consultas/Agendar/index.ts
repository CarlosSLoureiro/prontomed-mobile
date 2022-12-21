import { Repositories } from '@database';
import Consulta from '@entity/Consulta';
import Paciente from '@entity/Paciente';
import { Generos } from '@entity/Paciente/enums';
import ConsultasRepositoryInterface from '@repository/Consultas/interface';

import moment from 'moment';

export default class AgendarConsultasHelper {
  private readonly repository: ConsultasRepositoryInterface;

  constructor (repository: ConsultasRepositoryInterface = (global.repositories as Repositories).consultasRepository) {
    this.repository = repository;
  }

  public async executar (paciente: Paciente, data: Date): Promise<Consulta> {
    const possivelConsultaEmConflito = await this.repository.obterPossivelConsultaEmConflito(data);

    if (possivelConsultaEmConflito !== undefined) {
      throw new Error(`Você já possui uma consulta agendada para o dia ${moment(possivelConsultaEmConflito.dataAgendada).format('DD/MM/YYYY [as] HH[h]mm')} com ${possivelConsultaEmConflito.paciente.genero === Generos.FEMININO ? 'a' : 'o'} paciente ${possivelConsultaEmConflito.paciente.nome}`);
    }

    return await this.repository.agendar(paciente, data);
  }
}
