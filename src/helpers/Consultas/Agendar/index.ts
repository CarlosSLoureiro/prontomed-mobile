import { Repositories } from '@database';
import Consulta from '@entity/Consulta';
import Paciente from '@entity/Paciente';
import ConsultasRepositoryInterface from '@repository/Consultas/interface';

export default class AgendarConsultasHelper {
  private readonly repository: ConsultasRepositoryInterface;

  constructor (repository: ConsultasRepositoryInterface = (global.repositories as Repositories).consultasRepository) {
    this.repository = repository;
  }

  public async executar (paciente: Paciente, data: Date): Promise<Consulta> {
    const consulta = await this.repository.agendar(paciente, data);
    return consulta;
  }
}
