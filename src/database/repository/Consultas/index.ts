import { Between, DataSource, LessThan, Like, MoreThanOrEqual, Raw, Repository } from 'typeorm';

import Consulta from '@entity/Consulta';
import Paciente from '@entity/Paciente';

import ConsultasRepositoryInterface from './interface';

import { FiltrosDeBuscarConsultasContrato, StatusConsultas, StatusPacientes, ValoresStatusConsultas } from './types';

import moment from 'moment';

export default class ConsultasRepository implements ConsultasRepositoryInterface {
  private readonly repository: Repository<Consulta>;

  constructor (database: DataSource) {
    this.repository = database.getRepository(Consulta);
  }

  private valorNumerico (valor: string): boolean {
    return /^\d+$/.test(valor);
  }

  public async listar (pagina: number, quantidade: number, filtros: FiltrosDeBuscarConsultasContrato): Promise<Array<Consulta>> {
    let where = {};

    where = {
      ...where,
      finalizada: false
    };

    const order = { [filtros.ordenacao.chave]: filtros.ordenacao.ordem.toLowerCase() === 'decrescente' ? 'DESC' : 'ASC' };

    if (filtros.busca !== undefined) {
      const busca = filtros.busca;

      if (busca.finalizadas) {
        where = {};
      }

      if (busca.valor.length > 0) {
        if (!this.valorNumerico(busca.valor)) {
          where = {
            ...where,
            paciente: {
              nome: Like(`%${busca.valor}%`)
            }
          };
        } else {
          where = {
            ...where,
            id: busca.valor
          };
        }
      }
    }

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

  public async obterPossivelConsultaEmConflito (data: Date, ignorarIds: Array<number> = []): Promise<Consulta | undefined> {
    const tempoMedioDaConsulta = 29;
    const limiteInferior = moment(data).subtract(tempoMedioDaConsulta, 'm');
    const limiteSuperior = moment(data).add(tempoMedioDaConsulta, 'm');

    let where = {};

    where = {
      ...where,
      finalizada: false,
      dataAgendada: Between(limiteInferior.toDate(), limiteSuperior.toDate())
    };

    if (ignorarIds.length > 0) {
      where = {
        ...where,
        id: Raw((alias) => `${alias} NOT IN (:...ignorarIds)`, {
          ignorarIds
        })
      };
    }

    return await this.repository.findOne({
      relations: ['paciente'],
      where,
      order: {
        dataAgendada: 'DESC'
      }
    }) ?? undefined;
  }

  public async editar (consulta: Partial<Consulta>): Promise<Consulta> {
    consulta.dataAtualizacao = new Date();
    return await this.repository.save(consulta);
  }

  public async excluir (consulta: Consulta): Promise<Consulta> {
    return await this.repository.remove(consulta);
  }

  private async obterTotalDeConsultasPorMeses (meses: number): Promise<Array<ValoresStatusConsultas>> {
    const queryBuilder = this.repository.createQueryBuilder('consultas');

    queryBuilder.select('COUNT(consultas.id)', 'quantidade');
    queryBuilder.addSelect('STRFTIME("%Y-%m", consultas.dataCriacao)', 'anoMes');
    queryBuilder.addSelect('CAST(STRFTIME("%m", consultas.dataCriacao) AS INTEGER)', 'mes');

    queryBuilder.where('consultas.dataCriacao BETWEEN DATETIME("now", "start of month", "-:meses month") AND DATETIME("now")', { meses });

    queryBuilder.groupBy('anoMes');
    queryBuilder.orderBy('anoMes', 'ASC');

    return await queryBuilder.getRawMany();
  }

  private async obterTotalDeConsultasFinalizadasPorMeses (meses: number): Promise<Array<ValoresStatusConsultas>> {
    const queryBuilder = this.repository.createQueryBuilder('consultas');

    queryBuilder.select('COUNT(consultas.id)', 'quantidade');
    queryBuilder.addSelect('STRFTIME("%Y-%m", consultas.dataCriacao)', 'anoMes');
    queryBuilder.addSelect('CAST(STRFTIME("%m", consultas.dataAtualizacao) AS INTEGER)', 'mes');

    queryBuilder.where('consultas.dataAtualizacao BETWEEN DATETIME("now", "start of month", "-:meses month") AND DATETIME("now")', { meses });
    queryBuilder.andWhere('consultas.finalizada = 1');

    queryBuilder.groupBy('anoMes');
    queryBuilder.orderBy('anoMes', 'ASC');

    return await queryBuilder.getRawMany();
  }

  public async obterStatus (meses: number): Promise<StatusConsultas> {
    const totalDeConsultasPorMeses = await this.obterTotalDeConsultasPorMeses(meses);
    const totalDeConsultasFinalizadasPorMeses = await this.obterTotalDeConsultasFinalizadasPorMeses(meses);

    return {
      totalDeConsultasPorMeses,
      totalDeConsultasFinalizadasPorMeses
    };
  }

  public async obterStatusPacientes (meses: number): Promise<StatusPacientes> {
    const queryBuilder = this.repository.createQueryBuilder('consultas');

    queryBuilder.leftJoinAndSelect('consultas.paciente', 'pacientes');
    queryBuilder.select('COUNT(consultas.id)', 'quantidade');
    queryBuilder.addSelect('CAST(STRFTIME("%Y.%m%d", "now") - STRFTIME("%Y.%m%d", pacientes.dataNascimento) AS INTEGER)', 'idade');

    queryBuilder.where('consultas.dataAtualizacao BETWEEN DATETIME("now", "start of month", "-:meses month") AND DATETIME("now")', { meses });
    queryBuilder.andWhere('consultas.finalizada = 1');

    queryBuilder.groupBy('idade'); // Deveria agrupar pelo paciente também?
    queryBuilder.orderBy('quantidade', 'DESC');

    return await queryBuilder.getRawMany();
  }
}
