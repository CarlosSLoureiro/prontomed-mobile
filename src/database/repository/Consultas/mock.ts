import Consulta from '@entity/Consulta';
import Paciente from '@entity/Paciente';

import ConsultasRepositoryInterface from './interface';

import { StatusConsultas } from './types';

let consultas: Array<Consulta> = [];

export default class PacientesRepositoryMock implements ConsultasRepositoryInterface {
  public async listar (): Promise<Array<Consulta>> {
    return await Promise.resolve(consultas);
  }

  public async total (): Promise<number> {
    return await Promise.resolve(consultas.length);
  }

  public async totalAgendadas (): Promise<number> {
    return await Promise.resolve(consultas.length);
  }

  public async totalAtrasadas (): Promise<number> {
    return await Promise.resolve(consultas.length);
  }

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

  public async editar (consulta: Partial<Consulta>): Promise<Consulta> {
    return await Promise.resolve(consulta as Consulta);
  }

  public async excluir (consulta: Consulta): Promise<Consulta> {
    consultas = consultas.filter(c => (c.id !== consulta.id));
    return await Promise.resolve(consulta);
  }

  public async obterStatus (meses: number): Promise<StatusConsultas> {
    return await Promise.resolve({
      totalDeConsultasFinalizadasPorMeses: [],
      totalDeConsultasPorMeses: []
    });
  }
}
