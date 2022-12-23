import { OrdenacaoConsultasContrato, ValoresDeBuscaConsultas } from '@repository/consultas/types';

export interface ValoresDeBuscaConsultasContrato {
  titulo: string;
  valor: ValoresDeBuscaConsultas;
}

export interface OrdenarContrato {
  visivel: boolean;
  setVisivel: Function;
  callback: (selecionado: OrdenacaoConsultasContrato) => void;
  valorAtual: OrdenacaoConsultasContrato;
  valoresDeBusca: Array<ValoresDeBuscaConsultasContrato>;
}
