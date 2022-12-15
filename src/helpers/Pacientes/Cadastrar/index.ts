import { Repositories } from '@database';
import Paciente from '@entity/Paciente';
import PacientesRepositoryInterface from '@repository/Pacientes/interface';

export default class CadastrarPacientesHelper {
  private readonly repository: PacientesRepositoryInterface;
  public readonly tamanhoMinimoNome = 3;

  constructor (repository: PacientesRepositoryInterface = (global.repositories as Repositories).pacientesRepository) {
    this.repository = repository;
  }

  private nomeInvalido (nome: string | undefined): boolean {
    return (nome === undefined) || (nome !== undefined && nome.length < this.tamanhoMinimoNome);
  }

  private emailInvalido (email: string | undefined): boolean {
    return (email !== undefined && !(/\S+@\S+\.\S+/).test(email));
  }

  public async executar (dados: Partial<Paciente>): Promise<Paciente> {
    if (this.nomeInvalido(dados.nome)) {
      throw new Error(`O nome do paciente deve ter ao menos ${this.tamanhoMinimoNome} caracteres`);
    }

    if (this.emailInvalido(dados.email)) {
      throw new Error('O email do paciente é inválido');
    }

    const paciente = await this.repository.cadastrar(dados);
    return paciente;
  }
}
