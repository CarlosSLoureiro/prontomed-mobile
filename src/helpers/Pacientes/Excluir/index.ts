import { Repositories } from '@database';
import Consulta from '@entity/Consulta';
import Paciente from '@entity/Paciente';
import PacientesRepositoryInterface from '@repository/Pacientes/interface';

import CadastrarObservacaoHelper from '@helpers/Observacoes/Cadastrar';

export default class ExcluirPacientesHelper {
  private readonly repository: PacientesRepositoryInterface;

  constructor (repository: PacientesRepositoryInterface = (global.repositories as Repositories).pacientesRepository) {
    this.repository = repository;
  }

  private async cadastrarObservacao (consultas: Array<Consulta>): Promise<void> {
    try {
      const helper = new CadastrarObservacaoHelper();

      for (const consulta of consultas) {
        const observacao = await helper.executar(consulta, {
          mensagem: 'O paciente foi excluído'
        });
        consulta?.observacoes?.push(observacao);
      }
    } catch (e) {
    }
  }

  public async executar (paciente: Paciente): Promise<Paciente> {
    const pacienteExcluido = await this.repository.excluir(paciente);

    await this.cadastrarObservacao(paciente?.consultas ?? []);

    return pacienteExcluido;
  }
}
