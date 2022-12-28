import Consulta from '@entity/Consulta';
import Observacao from '@entity/Observacao';

export default interface ObservacoesRepositoryInterface {
  cadastrar: (consulta: Consulta, observacao: Partial<Observacao>) => Promise<Observacao>;
  editar: (observacao: Partial<Observacao>) => Promise<Observacao>;
  excluir: (observacao: Observacao) => Promise<Observacao>;
}
