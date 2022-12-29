import { Repositories } from '@database';
import Paciente from '@entity/Paciente';
import PacientesRepositoryInterface from '@repository/Pacientes/interface';

import validar from '@validators/Paciente';

export default class CadastrarPacientesHelper {
  private readonly repository: PacientesRepositoryInterface;

  constructor (repository: PacientesRepositoryInterface = (global.repositories as Repositories).pacientesRepository) {
    this.repository = repository;
  }

  public async executar (dados: Partial<Paciente>): Promise<Paciente> {
    validar(dados);
    const paciente = await this.repository.cadastrar(dados);
    return paciente;
  }
}
