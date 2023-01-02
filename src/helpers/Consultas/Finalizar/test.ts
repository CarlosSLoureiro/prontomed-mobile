import Consulta from '@entity/Consulta';
import ConsultaFactory from '@entity/Consulta/factory';
import ConsultasRepositoryInterface from '@repository/Consultas/interface';
import ConsultasRepositoryMock from '@repository/Consultas/mock';

import ObservacoesUtils from '@utils/Observacoes';

import ExcluirConsultasHelper from '.';

describe('helpers > Consultas > Finalizar', () => {
  let repository: ConsultasRepositoryInterface;
  let editarSpy: jest.SpyInstance<any>;
  let cadastrarObservacao: jest.SpyInstance<any>;
  let helper: ExcluirConsultasHelper;

  beforeEach(() => {
    repository = new ConsultasRepositoryMock();
    editarSpy = jest.spyOn(repository, 'editar');
    cadastrarObservacao = jest.spyOn(ObservacoesUtils, 'cadastrar');
    helper = new ExcluirConsultasHelper(repository);
  });

  test('deve retornar o consulta finalizada', async () => {
    const consultaFactory = new ConsultaFactory();
    consultaFactory.finalizada = false;

    await expect(helper.executar(consultaFactory)).resolves.toBeInstanceOf(Consulta);
    expect(editarSpy).toHaveBeenCalledWith(consultaFactory);
    expect(consultaFactory.finalizada).toBe(true);
  });

  test('deve cadastrar observação na consulta finalizada', async () => {
    const consultaFactory = new ConsultaFactory();

    editarSpy.mockReturnValue(consultaFactory);

    await expect(helper.executar(consultaFactory)).resolves.toBeInstanceOf(Consulta);
    expect(editarSpy).toHaveBeenCalledWith(consultaFactory);
    expect(cadastrarObservacao).toHaveBeenCalledWith('Consulta finalizada', [consultaFactory]);
  });
});
