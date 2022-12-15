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
});
