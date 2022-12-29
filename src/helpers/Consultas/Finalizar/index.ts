import { Repositories } from '@database';
import Consulta from '@entity/Consulta';
import ConsultasRepositoryInterface from '@repository/Consultas/interface';

import CadastrarObservacaoHelper from '@helpers/Observacoes/Cadastrar';

export default class FinalizarConsultasHelper {
  private readonly repository: ConsultasRepositoryInterface;
  public readonly tamanhoMinimoNome = 3;

  constructor (repository: ConsultasRepositoryInterface = (global.repositories as Repositories).consultasRepository) {
    this.repository = repository;
  }

  private async cadastrarObservacao (consulta: Consulta): Promise<void> {
    try {
      const helper = new CadastrarObservacaoHelper();
      const observacao = await helper.executar(consulta, {
        mensagem: 'Consulta finalizada'
      });
      consulta?.observacoes?.push(observacao);
    } catch (e) {
    }
  }

  public async executar (consulta: Partial<Consulta>): Promise<Consulta> {
    consulta.finalizada = true;

    const consultaEditada = await this.repository.editar(consulta);

    await this.cadastrarObservacao(consultaEditada);

    return consultaEditada;
  }
}
