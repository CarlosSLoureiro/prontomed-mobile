import Consulta from '@entity/Consulta';
import Observacao from '@entity/Observacao';
import ObservacaoFactory from '@entity/Observacao/factory';

import ObservacoesRepositoryInterface from './interface';

let observacoes: Array<Observacao> = [];

export default class ObservacoesRepositoryMock implements ObservacoesRepositoryInterface {
  public async cadastrar (consulta: Consulta, mensagem: string): Promise<Observacao> {
    const observacao = new ObservacaoFactory();

    observacao.consulta = consulta;
    observacao.mensagem = mensagem;

    observacoes.push(observacao);

    return await Promise.resolve(observacao);
  }

  public async editar (observacao: Observacao): Promise<Observacao> {
    return await Promise.resolve(observacao);
  }

  public async excluir (observacao: Observacao): Promise<Observacao> {
    observacoes = observacoes.filter(obs => (obs.id !== observacao.id));
    return await Promise.resolve(observacao);
  }
}
