import { Repositories } from '@database';
import Observacao from '@entity/Observacao';
import ObservacoesRepositoryInterface from '@repository/Observacoes/interface';

export default class ExcluirObservacaoHelper {
  private readonly repository: ObservacoesRepositoryInterface;

  constructor (repository: ObservacoesRepositoryInterface = (global.repositories as Repositories).observacoesRepository) {
    this.repository = repository;
  }

  public async executar (observacao: Observacao): Promise<Observacao> {
    return await this.repository.excluir(observacao);
  }
}
