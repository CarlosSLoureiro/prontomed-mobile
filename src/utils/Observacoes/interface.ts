import Consulta from '@entity/Consulta';

export default interface ObservacoesUtilsInterface {
  cadastrar: (mensagem: string, observacoes: Array<Consulta>) => Promise<void>;
}
