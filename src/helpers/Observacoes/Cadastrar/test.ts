import ConsultaFactory from '@entity/Consulta/factory';
import Observacao from '@entity/Observacao';
import ObservacaoFactory from '@entity/Observacao/factory';
import ObservacoesRepositoryInterface from '@repository/Observacoes/interface';
import ObservacoesRepositoryMock from '@repository/Observacoes/mock';

import CadastrarObservacaoHelper from '@helpers/Observacoes/Cadastrar';

describe('helpers > Observações > Excluir', () => {
  let repository: ObservacoesRepositoryInterface;
  let cadastrarSpy: jest.SpyInstance<any>;
  let helper: CadastrarObservacaoHelper;

  beforeEach(() => {
    repository = new ObservacoesRepositoryMock();
    cadastrarSpy = jest.spyOn(repository, 'cadastrar');
    helper = new CadastrarObservacaoHelper(repository);
  });

  test('dever returnar a observação cadastrada', async () => {
    const consulta = new ConsultaFactory();
    const factory = new ObservacaoFactory();

    await expect(helper.executar(consulta, factory)).resolves.toBeInstanceOf(Observacao);
    expect(cadastrarSpy).toHaveBeenCalledWith(consulta, factory);
  });
});
