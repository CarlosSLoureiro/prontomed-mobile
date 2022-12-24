import Consulta from '@entity/Consulta';
import ConsultasRepositoryInterface from '@repository/Consultas/interface';
import ConsultasRepositoryMock from '@repository/Consultas/mock';

import ExcluirConsultasHelper from '.';

describe('helpers > Consultas > Excluir', () => {
  let repository: ConsultasRepositoryInterface;
  let excluirSpy: jest.SpyInstance<any>;
  let helper: ExcluirConsultasHelper;

  beforeEach(() => {
    repository = new ConsultasRepositoryMock();
    excluirSpy = jest.spyOn(repository, 'excluir');
    helper = new ExcluirConsultasHelper(repository);
  });

  test('deve retornar o consulta excluído', async () => {
    const consulta = new Consulta();

    await expect(helper.executar(consulta)).resolves.toBeInstanceOf(Consulta);
    expect(excluirSpy).toHaveBeenCalledWith(consulta);
  });
});
