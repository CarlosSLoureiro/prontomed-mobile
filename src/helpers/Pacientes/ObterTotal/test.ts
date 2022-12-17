import PacientesRepositoryInterface from '@repository/Pacientes/interface';
import PacientesRepositoryMock from '@repository/Pacientes/mock';

import ObterTotalPacientesHelper from '@helpers/Pacientes/ObterTotal';

describe('helpers > Pacientes > ObterTotal', () => {
  let repository: PacientesRepositoryInterface;
  let totalSpy: jest.SpyInstance<any>;
  let helper: ObterTotalPacientesHelper;

  beforeEach(() => {
    repository = new PacientesRepositoryMock();
    totalSpy = jest.spyOn(repository, 'total');
    helper = new ObterTotalPacientesHelper(repository);
  });

  test('deve retornar o total de pacientes', async () => {
    const result = await helper.executar();

    expect(totalSpy).toHaveBeenCalledTimes(1);
    expect(typeof result).toBe('number');
  });
});
