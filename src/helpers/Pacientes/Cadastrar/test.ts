import Paciente from '@entity/Paciente';
import PacientesRepositoryInterface from '@repository/Pacientes/interface';
import PacientesRepositoryMock from '@repository/Pacientes/mock';

import CadastrarPacientesHelper from '@helpers/Pacientes/Cadastrar';

describe('helpers > Pacientes > Cadastrar', () => {
  let repository: PacientesRepositoryInterface;
  let cadastrarSpy: jest.SpyInstance<any>;
  let helper: CadastrarPacientesHelper;

  beforeEach(() => {
    repository = new PacientesRepositoryMock();
    cadastrarSpy = jest.spyOn(repository, 'cadastrar');
    helper = new CadastrarPacientesHelper(repository);
  });

  test('deve retornar erro quando nome do paciente for inválido', async () => {
    const dados: Partial<Paciente> = {};

    await expect(helper.executar(dados)).rejects.toThrow(`O nome do paciente deve ter ao menos ${helper.tamanhoMinimoNome} caracteres`);
    expect(cadastrarSpy).toHaveBeenCalledTimes(0);
  });

  describe('deve retornar erro quando nome do paciente for inválido', () => {
    const emails = ['carlos', 'carlos@gmail,com', 'loureirogmail.com'];

    emails.forEach(email => test(`testa com email > ${email}`, async () => {
      const dados: Partial<Paciente> = {
        nome: 'Carlos Loureiro',
        email
      };

      await expect(helper.executar(dados)).rejects.toThrow('O email do paciente é inválido');
      expect(cadastrarSpy).toHaveBeenCalledTimes(0);
    }));
  });
});
