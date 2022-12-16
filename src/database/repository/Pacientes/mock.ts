import Paciente from '@entity/Paciente';

import PacientesRepositoryInterface from './interface';

let pacientes: Array<Paciente> = [];

export default class PacientesRepositoryMock implements PacientesRepositoryInterface {
  public async total (): Promise<number> {
    return await Promise.resolve(pacientes.length);
  }

  public async listar (pagina: number): Promise<Array<Paciente>> {
    return await Promise.resolve(pacientes);
  }

  public async cadastrar (dados: Partial<Paciente>): Promise<Paciente> {
    const paciente = dados as Paciente;

    pacientes.push(paciente);

    return await Promise.resolve(paciente);
  }

  public async deletar (id: number): Promise<void> {
    pacientes = pacientes.filter(paciente => (paciente.id !== id));
    await Promise.resolve();
  }
}
