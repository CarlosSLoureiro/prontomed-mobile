import Consulta from '@entity/Consulta';

import CadastrarObservacaoHelper from '@helpers/Observacoes/Cadastrar';

import ObservacoesUtilsInterface from './interface';

class ObservacoesUtils implements ObservacoesUtilsInterface {
  private static _instancia: ObservacoesUtils;

  public static get Instancia (): ObservacoesUtils {
    return this._instancia || (this._instancia = new this());
  }

  public async cadastrar (mensagem: string, consultas: Array<Consulta>): Promise<void> {
    try {
      const helper = new CadastrarObservacaoHelper();

      for (const consulta of consultas) {
        const observacao = await helper.executar(consulta, {
          mensagem
        });
        consulta?.observacoes?.push(observacao);
      }
    } catch (e) {
    }
  }
}

export default ObservacoesUtils.Instancia;
