import Consulta from '@entity/Consulta';
import Paciente from '@entity/Paciente';

import ConsultasRepositoryInterface from './interface';

const consultas: Array<Consulta> = [];

export default class PacientesRepositoryMock implements ConsultasRepositoryInterface {
  public async agendar (paciente: Paciente, data: Date): Promise<Consulta> {
    const consulta = new Consulta();

    consulta.paciente = paciente;
    consulta.dataAgendada = data;

    consultas.push(consulta);

    return await Promise.resolve(consulta);
  }

  public async obterPossivelConsultaEmConflito (data: Date): Promise<Consulta | undefined> {
    return await Promise.resolve(new Consulta());
  }
}
