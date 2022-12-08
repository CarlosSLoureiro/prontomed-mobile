import PacientesRepositoryInterface from '@repository/pacientes/interface';
import PacientesRepositoryMock from '@repository/pacientes/mock';

import ObterTotalPacientesHelper from '@helpers/pacientes/obterTotal';

const repository: PacientesRepositoryInterface = new PacientesRepositoryMock();
let helper: ObterTotalPacientesHelper;

describe('helpers > pacientes > obterTotal', () => {
  const totalSpy = jest.spyOn(repository, 'total');

  beforeEach(() => {
    helper = new ObterTotalPacientesHelper(repository);
  });

  test('deve retornar o total de pacientes', async () => {
    const result = await helper.run();

    expect(totalSpy).toHaveBeenCalledTimes(1);
    expect(typeof result).toBe('number');
  });
});
