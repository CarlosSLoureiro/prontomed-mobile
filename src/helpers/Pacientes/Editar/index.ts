import { Repositories } from '@database';
import Paciente from '@entity/Paciente';
import PacientesRepositoryInterface from '@repository/Pacientes/interface';

import validar from '@validators/Paciente';

export default class EditarPacientesHelper {
  private readonly repository: PacientesRepositoryInterface;
  public readonly tamanhoMinimoNome = 3;

  constructor (repository: PacientesRepositoryInterface = (global.repositories as Repositories).pacientesRepository) {
    this.repository = repository;
  }

  public async executar (paciente: Partial<Paciente>): Promise<Paciente> {
    validar(paciente);
    return await this.repository.editar(paciente);
  }
}
