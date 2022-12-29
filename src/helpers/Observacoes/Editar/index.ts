import { Repositories } from '@database';
import Observacao from '@entity/Observacao';
import ObservacoesRepositoryInterface from '@repository/Observacoes/interface';

export default class EditarObservacaoHelper {
  private readonly repository: ObservacoesRepositoryInterface;

  constructor (repository: ObservacoesRepositoryInterface = (global.repositories as Repositories).observacoesRepository) {
    this.repository = repository;
  }

  public async executar (observacao: Partial<Observacao>): Promise<Observacao> {
    return await this.repository.editar(observacao);
  }
}
