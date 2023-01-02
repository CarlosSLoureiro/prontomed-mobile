import ConsultasRepositoryInterface from '@repository/Consultas/interface';
import ConsultasRepositoryMock from '@repository/Consultas/mock';

import ObterTotalConsultasHelper from '@helpers/Consultas/ObterTotal';

describe('helpers > Consultas > ObterTotal', () => {
  let repository: ConsultasRepositoryInterface;
  let totalSpy: jest.SpyInstance<any>;
  let helper: ObterTotalConsultasHelper;

  beforeEach(() => {
    repository = new ConsultasRepositoryMock();
    totalSpy = jest.spyOn(repository, 'total');
    helper = new ObterTotalConsultasHelper(repository);
  });

  test('deve retornar o total de consultas', async () => {
    const result = await helper.executar();

    expect(totalSpy).toHaveBeenCalledTimes(1);
    expect(typeof result).toBe('number');
  });
});
