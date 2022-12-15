import Paciente from '@entity/Paciente';
import PacienteFactory from '@entity/Paciente/factory';
import PacientesRepositoryInterface from '@repository/Pacientes/interface';
import PacientesRepositoryMock from '@repository/Pacientes/mock';

import CadastrarPacientesHelper from '@helpers/Pacientes/Cadastrar';

const factory = new PacienteFactory();

describe('helpers > Pacientes > Cadastrar', () => {
  let repository: PacientesRepositoryInterface;
  let cadastrarSpy: jest.SpyInstance<any>;
  let helper: CadastrarPacientesHelper;

  beforeEach(() => {
    repository = new PacientesRepositoryMock();
    cadastrarSpy = jest.spyOn(repository, 'cadastrar');
    helper = new CadastrarPacientesHelper(repository);
  });

  test('deve cadastrar o paciente com sucesso', async () => {
    await expect(helper.executar(factory)).resolves.toBeInstanceOf(Paciente);
    expect(cadastrarSpy).toHaveBeenCalledWith(factory);
  });

  describe('deve retornar erro quando o nome do paciente for inválido', () => {
    const nomes = [undefined, 'A', 'AL'];
    nomes.forEach(nome => test(`testa com nome > ${nome ?? 'undefined'}`, async () => {
      const dados: Partial<Paciente> = {
        ...factory,
        nome
      };

      await expect(helper.executar(dados)).rejects.toThrow(`O nome do paciente deve ter ao menos ${helper.tamanhoMinimoNome} caracteres`);
      expect(cadastrarSpy).toHaveBeenCalledTimes(0);
    }));
  });

  describe('deve retornar erro quando o email do paciente for inválido', () => {
    const emails = ['carlos', 'carlos@gmail,com', 'loureirogmail.com'];

    emails.forEach(email => test(`testa com email > ${email}`, async () => {
      const dados: Partial<Paciente> = {
        ...factory,
        email
      };

      await expect(helper.executar(dados)).rejects.toThrow('O email do paciente é inválido');
      expect(cadastrarSpy).toHaveBeenCalledTimes(0);
    }));
  });

  describe('deve retornar erro quando o telefone do paciente for inválido', () => {
    const telefones = ['(21) 99999-99999', '(21) 99999-99', '123456'];

    telefones.forEach(telefone => test(`testa com telefone > ${telefone}`, async () => {
      const dados: Partial<Paciente> = {
        ...factory,
        telefone
      };

      await expect(helper.executar(dados)).rejects.toThrow('O telefone do paciente é inválido');
      expect(cadastrarSpy).toHaveBeenCalledTimes(0);
    }));
  });

  test('deve retornar erro quando a data de nascimento do paciente for inválida', async () => {
    const dataNascimento = undefined;
    const dados: Partial<Paciente> = {
      ...factory,
      dataNascimento
    };

    await expect(helper.executar(dados)).rejects.toThrow('A data de nascimento do paciente é inválida');
    expect(cadastrarSpy).toHaveBeenCalledTimes(0);
  });

  test('deve retornar erro quando o gênero do paciente for inválido', async () => {
    const genero = undefined;
    const dados: Partial<Paciente> = {
      ...factory,
      genero
    };

    await expect(helper.executar(dados)).rejects.toThrow('O gênero do paciente é inválido');
    expect(cadastrarSpy).toHaveBeenCalledTimes(0);
  });

  test('deve retornar erro quando o peso do paciente for inválido', async () => {
    const peso = undefined;
    const dados: Partial<Paciente> = {
      ...factory,
      peso
    };

    await expect(helper.executar(dados)).rejects.toThrow('O peso do paciente é inválido');
    expect(cadastrarSpy).toHaveBeenCalledTimes(0);
  });

  describe('deve retornar erro quando a altura do paciente for inválida', () => {
    const alturas = [undefined, 3.01, 3, 12.1];

    alturas.forEach(altura => test(`testa com altura > ${altura ?? 'undefined'}`, async () => {
      const dados: Partial<Paciente> = {
        ...factory,
        altura
      };

      await expect(helper.executar(dados)).rejects.toThrow('A altura do paciente é inválida');
      expect(cadastrarSpy).toHaveBeenCalledTimes(0);
    }));
  });

  test('deve retornar erro quando o tipo sanguíneo do paciente for inválido', async () => {
    const tipoSanguineo = undefined;
    const dados: Partial<Paciente> = {
      ...factory,
      tipoSanguineo
    };

    await expect(helper.executar(dados)).rejects.toThrow('O tipo sanguíneo do paciente é inválido');
    expect(cadastrarSpy).toHaveBeenCalledTimes(0);
  });
});
