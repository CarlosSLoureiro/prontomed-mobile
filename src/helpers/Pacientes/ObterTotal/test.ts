import PacientesRepositoryInterface from '@repository/Pacientes/interface';
import PacientesRepositoryMock from '@repository/Pacientes/mock';

import ObterTotalPacientesHelper from '@helpers/Pacientes/ObterTotal';

const repository: PacientesRepositoryInterface = new PacientesRepositoryMock();
let helper: ObterTotalPacientesHelper;

describe('helpers > pacientes > obterTotal', () => {
  const totalSpy = jest.spyOn(repository, 'total');

  beforeEach(() => {
    helper = new ObterTotalPacientesHelper(repository);
  });

  test('deve retornar o total de pacientes', async () => {
    const result = await helper.executar();

    expect(totalSpy).toHaveBeenCalledTimes(1);
    expect(typeof result).toBe('number');
  });
});
