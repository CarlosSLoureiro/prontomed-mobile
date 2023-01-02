import Consulta from '@entity/Consulta';
import ConsultasRepositoryInterface from '@repository/Consultas/interface';
import ConsultasRepositoryMock from '@repository/Consultas/mock';
import { FiltrosDeBuscarConsultasContrato } from '@repository/Consultas/types';

import ListarConsultasHelper from '.';

describe('helpers > Consultas > Listar', () => {
  let repository: ConsultasRepositoryInterface;
  let listarSpy: jest.SpyInstance<any>;
  let helper: ListarConsultasHelper;

  beforeEach(() => {
    repository = new ConsultasRepositoryMock();
    listarSpy = jest.spyOn(repository, 'listar');
    helper = new ListarConsultasHelper(repository);
  });

  test('deve retornar uma listagem de consultas', async () => {
    const filtros: FiltrosDeBuscarConsultasContrato = {
      ordenacao: {
        ordem: 'decrescente',
        chave: 'id'
      }
    };

    await expect(helper.executar(0, 6, filtros)).resolves.toBeInstanceOf(Array<Consulta>);
    expect(listarSpy).toHaveBeenCalledTimes(1);
  });
});
