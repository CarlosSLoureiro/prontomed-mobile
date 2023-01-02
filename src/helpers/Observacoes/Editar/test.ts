import Observacao from '@entity/Observacao';
import ObservacaoFactory from '@entity/Observacao/factory';
import ObservacoesRepositoryInterface from '@repository/Observacoes/interface';
import ObservacoesRepositoryMock from '@repository/Observacoes/mock';

import EditarObservacaoHelper from '@helpers/Observacoes/Editar';

describe('helpers > Observações > Excluir', () => {
  let repository: ObservacoesRepositoryInterface;
  let editarSpy: jest.SpyInstance<any>;
  let helper: EditarObservacaoHelper;

  beforeEach(() => {
    repository = new ObservacoesRepositoryMock();
    editarSpy = jest.spyOn(repository, 'editar');
    helper = new EditarObservacaoHelper(repository);
  });

  test('dever retornar observação editada com sucesso', async () => {
    const factory = new ObservacaoFactory();

    await expect(helper.executar(factory)).resolves.toBeInstanceOf(Observacao);
    expect(editarSpy).toHaveBeenCalledWith(factory);
  });
});
