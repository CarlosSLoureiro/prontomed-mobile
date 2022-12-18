import Paciente from '@entity/Paciente';
import PacienteFactory from '@entity/Paciente/factory';

import PacientesRepositoryInterface from './interface';

let pacientes: Array<Paciente> = [];

export default class PacientesRepositoryMock implements PacientesRepositoryInterface {
  public async encontrar (): Promise<Paciente> {
    return await Promise.resolve(new PacienteFactory() as Paciente);
  }

  public async listar (): Promise<Array<Paciente>> {
    return await Promise.resolve(pacientes);
  }

  public async total (): Promise<number> {
    return await Promise.resolve(pacientes.length);
  }

  public async cadastrar (dados: Partial<Paciente>): Promise<Paciente> {
    const paciente = dados as Paciente;

    pacientes.push(paciente);

    return await Promise.resolve(paciente);
  }

  public async editar (dados: Partial<Paciente>): Promise<Paciente> {
    return await Promise.resolve(dados as Paciente);
  }

  public async excluir (paciente: Paciente): Promise<Paciente> {
    pacientes = pacientes.filter(p => (p.id !== paciente.id));
    return await Promise.resolve(paciente);
  }
}
