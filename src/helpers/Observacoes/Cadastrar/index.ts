import { Repositories } from '@database';
import Consulta from '@entity/Consulta';
import Observacao from '@entity/Observacao';
import ObservacoesRepositoryInterface from '@repository/Observacoes/interface';

export default class CadastrarObservacaoHelper {
  private readonly repository: ObservacoesRepositoryInterface;

  constructor (repository: ObservacoesRepositoryInterface = (global.repositories as Repositories).observacoesRepository) {
    this.repository = repository;
  }

  public async executar (consulta: Consulta, observacao: Partial<Observacao>): Promise<Observacao> {
    return await this.repository.cadastrar(consulta, observacao);
  }
}
