import { Between, DataSource, LessThan, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';

import Consulta from '@entity/Consulta';
import Paciente from '@entity/Paciente';

import ConsultasRepositoryInterface from './interface';

import { FiltrosDeBuscarConsultasContrato } from './types';

import moment from 'moment';

export default class ConsultasRepository implements ConsultasRepositoryInterface {
  private readonly repository: Repository<Consulta>;

  constructor (database: DataSource) {
    this.repository = database.getRepository(Consulta);
  }

  public async listar (pagina: number, quantidade: number, filtros: FiltrosDeBuscarConsultasContrato): Promise<Array<Consulta>> {
    let where = {};
    const order = { [filtros.ordenacao.chave]: filtros.ordenacao.ordem.toLowerCase() === 'decrescente' ? 'DESC' : 'ASC' };

    if (filtros.datas?.inicio !== undefined) {
      where = {
        ...where,
        dataAgendada: filtros.datas?.fim !== undefined ? Between(filtros.datas?.inicio, filtros.datas?.fim) : MoreThanOrEqual(filtros.datas?.inicio)
      };
    }

    return await this.repository.find({
      where,
      order,
      relations: ['paciente', 'observacoes'],
      take: quantidade,
      skip: quantidade * pagina
    });
  }

  public async total (): Promise<number> {
    return await this.repository.count();
  }

  public async totalAgendadas (): Promise<number> {
    return await this.repository.countBy({ finalizada: false });
  }

  public async totalAtrasadas (): Promise<number> {
    const inicioDoDia = new Date();
    inicioDoDia.setHours(0, 0, 0, 0);

    return await this.repository.countBy({
      finalizada: false,
      dataAgendada: LessThan(inicioDoDia)
    });
  }

  public async agendar (paciente: Paciente, data: Date): Promise<Consulta> {
    const consulta = this.repository.create();

    consulta.paciente = paciente;
    consulta.finalizada = false;
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
