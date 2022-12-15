import { Repositories } from '@database';
import Paciente from '@entity/Paciente';
import PacientesRepositoryInterface from '@repository/Pacientes/interface';

export default class CadastrarPacientesHelper {
  private readonly repository: PacientesRepositoryInterface;
  public readonly tamanhoMinimoNome = 3;

  constructor (repository: PacientesRepositoryInterface = (global.repositories as Repositories).pacientesRepository) {
    this.repository = repository;
  }

  private valorIndefinido (valor: any): boolean {
    return (valor === undefined);
  }

  private nomeInvalido (nome: string | undefined): boolean {
    return (nome === undefined) || (
      nome !== undefined &&
      nome.length < this.tamanhoMinimoNome
    );
  }

  private emailInvalido (email: string | undefined): boolean {
    return (email !== undefined && !(/\S+@\S+\.\S+/).test(email));
  }

  private telefoneInvalido (telefone: string | undefined): boolean {
    if (telefone !== undefined) {
      const apenasNumeros = telefone.replace(/\D/g, '');
      return (apenasNumeros.length < 10 || apenasNumeros.length > 11);
    } else {
      return false;
    }
  }

  private alturaInvalida (altura: number | undefined): boolean {
    return (altura === undefined) || (
      altura !== undefined &&
      altura >= 3
    );
  }

  public async executar (dados: Partial<Paciente>): Promise<Paciente> {
    if (this.nomeInvalido(dados.nome)) {
      throw new Error(`O nome do paciente deve ter ao menos ${this.tamanhoMinimoNome} caracteres`);
    }

    if (this.emailInvalido(dados.email)) {
      throw new Error('O email do paciente é inválido');
    }

    if (this.telefoneInvalido(dados.telefone)) {
      throw new Error('O telefone do paciente é inválido');
    }

    if (this.valorIndefinido(dados.dataNascimento)) {
      throw new Error('A data de nascimento do paciente é inválida');
    }

    if (this.valorIndefinido(dados.genero)) {
      throw new Error('O gênero do paciente é inválido');
    }

    if (this.valorIndefinido(dados.peso)) {
      throw new Error('O peso do paciente é inválido');
    }

    if (this.alturaInvalida(dados.altura)) {
      throw new Error('A altura do paciente é inválida');
    }

    if (this.valorIndefinido(dados.tipoSanguineo)) {
      throw new Error('O tipo sanguíneo do paciente é inválido');
    }

    const paciente = await this.repository.cadastrar(dados);
    return paciente;
  }
}
