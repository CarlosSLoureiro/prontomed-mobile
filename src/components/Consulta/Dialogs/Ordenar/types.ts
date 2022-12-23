import { OrdenacaoConsultasContrato, ValoresDeBuscaConsultas } from '@repository/Consultas/types';

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
