import Consulta from '@entity/Consulta';
import ConsultaFactory from '@entity/Consulta/factory';
import ConsultasRepositoryInterface from '@repository/Consultas/interface';
import ConsultasRepositoryMock from '@repository/Consultas/mock';

import ObservacoesUtils from '@utils/Observacoes';

import ExcluirConsultasHelper from '.';

describe('helpers > Consultas > Reabrir', () => {
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

  test('deve retornar o consulta reaberta', async () => {
    const consulta = new ConsultaFactory();
    consulta.finalizada = true;

    await expect(helper.executar(consulta)).resolves.toBeInstanceOf(Consulta);
    expect(editarSpy).toHaveBeenCalledWith(consulta);
    expect(consulta.finalizada).toBe(false);
  });

  test('deve cadastrar observação na consulta reaberta', async () => {
    const consultaFactory = new ConsultaFactory();

    editarSpy.mockReturnValue(consultaFactory);

    await expect(helper.executar(consultaFactory)).resolves.toBeInstanceOf(Consulta);
    expect(editarSpy).toHaveBeenCalledWith(consultaFactory);
    expect(cadastrarObservacao).toHaveBeenCalledWith('Consulta reaberta', [consultaFactory]);
  });
});
