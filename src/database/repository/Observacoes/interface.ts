import Consulta from '@entity/Consulta';
import Observacao from '@entity/Observacao';

export default interface ObservacoesRepositoryInterface {
  cadastrar: (consulta: Consulta, mensagem: string) => Promise<Observacao>;
  editar: (observacao: Observacao) => Promise<Observacao>;
  excluir: (observacao: Observacao) => Promise<Observacao>;
}
