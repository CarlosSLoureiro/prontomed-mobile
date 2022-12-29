import { Repositories } from '@database';
import Paciente from '@entity/Paciente';
import PacientesRepositoryInterface from '@repository/Pacientes/interface';

import ObservacoesUtils from '@utils/Observacoes';

export default class ExcluirPacientesHelper {
  private readonly repository: PacientesRepositoryInterface;

  constructor (repository: PacientesRepositoryInterface = (global.repositories as Repositories).pacientesRepository) {
    this.repository = repository;
  }

  public async executar (paciente: Paciente): Promise<Paciente> {
    const pacienteExcluido = await this.repository.excluir(paciente);

    await ObservacoesUtils.cadastrar('O paciente foi excluído', paciente?.consultas ?? []);

    return pacienteExcluido;
  }
}
