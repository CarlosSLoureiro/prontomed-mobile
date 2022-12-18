import Paciente from '@entity/Paciente';
import PacienteFactory from '@entity/Paciente/factory';
import PacientesRepositoryInterface from '@repository/Pacientes/interface';
import PacientesRepositoryMock from '@repository/Pacientes/mock';

import ExcluirPacientesHelper from '.';

describe('helpers > Pacientes > Excluir', () => {
  let repository: PacientesRepositoryInterface;
  let excluirSpy: jest.SpyInstance<any>;
  let helper: ExcluirPacientesHelper;

  beforeEach(() => {
    repository = new PacientesRepositoryMock();
    excluirSpy = jest.spyOn(repository, 'excluir');
    helper = new ExcluirPacientesHelper(repository);
  });

  test('deve retornar o paciente excluído', async () => {
    const factory = new PacienteFactory();

    await expect(helper.executar(factory)).resolves.toBeInstanceOf(Paciente);
    expect(excluirSpy).toHaveBeenCalledWith(factory);
  });
});
