import { DataSource, Repository } from 'typeorm';

import Consulta from '@entity/Consulta';
import Observacao from '@entity/Observacao';

import ObservacoesRepositoryInterface from './interface';

export default class ObservacoesRepository implements ObservacoesRepositoryInterface {
  private readonly repository: Repository<Observacao>;

  constructor (database: DataSource) {
    this.repository = database.getRepository(Observacao);
  }

  public async cadastrar (consulta: Consulta, mensagem: string): Promise<Observacao> {
    const observacao = this.repository.create();

    observacao.consulta = consulta;
    observacao.mensagem = mensagem;
    observacao.dataAtualizacao = observacao.dataCriacao = new Date();

    return await this.repository.save(observacao);
  }

  public async editar (observacao: Observacao): Promise<Observacao> {
    observacao.dataAtualizacao = new Date();
    return await this.repository.save(observacao);
  }

  public async excluir (observacao: Observacao): Promise<Observacao> {
    return await this.repository.remove(observacao);
  }
}
