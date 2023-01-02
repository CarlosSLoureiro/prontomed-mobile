import Observacao from '@entity/Observacao';
import ObservacaoFactory from '@entity/Observacao/factory';
import ObservacoesRepositoryInterface from '@repository/Observacoes/interface';
import ObservacoesRepositoryMock from '@repository/Observacoes/mock';

import ExcluirObservacaoHelper from '@helpers/Observacoes/Excluir';

describe('helpers > Observações > Excluir', () => {
  let repository: ObservacoesRepositoryInterface;
  let excluirSpy: jest.SpyInstance<any>;
  let helper: ExcluirObservacaoHelper;

  beforeEach(() => {
    repository = new ObservacoesRepositoryMock();
    excluirSpy = jest.spyOn(repository, 'excluir');
    helper = new ExcluirObservacaoHelper(repository);
  });

  test('deve retornar a observacao excluída', async () => {
    const factory = new ObservacaoFactory();

    await expect(helper.executar(factory)).resolves.toBeInstanceOf(Observacao);
    expect(excluirSpy).toHaveBeenCalledWith(factory);
  });
});
