import { Between, DataSource, Repository } from 'typeorm';

import Consulta from '@entity/Consulta';
import Paciente from '@entity/Paciente';

import ConsultasRepositoryInterface from './interface';

import moment from 'moment';

export default class ConsultasRepository implements ConsultasRepositoryInterface {
  private readonly repository: Repository<Consulta>;

  constructor (database: DataSource) {
    this.repository = database.getRepository(Consulta);
  }

  public async listar (pagina: number, filtros: any): Promise<Array<Consulta>> {
    const rows = 10;

    return await this.repository.find({
      relations: ['paciente'],
      take: rows,
      skip: rows * pagina
    });
  }

  public async total (): Promise<number> {
    return await this.repository.count();
  }

  public async agendar (paciente: Paciente, data: Date): Promise<Consulta> {
    const consulta = this.repository.create();

    consulta.paciente = paciente;
    consulta.dataAgendada = data;
    consulta.dataAtualizacao = consulta.dataCriacao = new Date();

    return await this.repository.save(consulta);
  }

  public async obterPossivelConsultaEmConflito (data: Date): Promise<Consulta | undefined> {
    const tempoMedioDaConsulta = 29;
    const limiteInferior = moment(data).subtract(tempoMedioDaConsulta, 'm');
    const limiteSuperior = moment(data).add(tempoMedioDaConsulta, 'm');

    return await this.repository.findOne({
      relations: ['paciente'],
      where: {
        dataAgendada: Between(limiteInferior.toDate(), limiteSuperior.toDate())
      },
      order: {
        dataAgendada: 'DESC'
      }
    }) ?? undefined;
  }

  public async editar (consulta: Partial<Consulta>): Promise<Consulta> {
    consulta.dataAtualizacao = new Date();
    return await this.repository.save(consulta);
  }
}
