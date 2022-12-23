import Paciente from '@entity/Paciente';
import PacientesRepositoryInterface from '@repository/Pacientes/interface';
import PacientesRepositoryMock from '@repository/Pacientes/mock';
import { FiltrosDeBuscarPacientesContrato } from '@repository/Pacientes/types';

import ListarPacientesHelper from '.';

describe('helpers > Pacientes > Listar', () => {
  let repository: PacientesRepositoryInterface;
  let listarSpy: jest.SpyInstance<any>;
  let helper: ListarPacientesHelper;

  beforeEach(() => {
    repository = new PacientesRepositoryMock();
    listarSpy = jest.spyOn(repository, 'listar');
    helper = new ListarPacientesHelper(repository);
  });

  test('deve retornar uma listagem de pacientes', async () => {
    const filtros: FiltrosDeBuscarPacientesContrato = {
      ordenacao: {
        ordem: 'decrescente',
        chave: 'id'
      }
    };

    await expect(helper.executar(0, filtros)).resolves.toBeInstanceOf(Array<Paciente>);
    expect(listarSpy).toHaveBeenCalledTimes(1);
  });
});
