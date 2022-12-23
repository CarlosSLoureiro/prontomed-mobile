import { OrdenacaoConsultasContrato, ValoresDeBusca } from '@repository/consultas/types';

export interface ValoresDeBuscaContrato {
  titulo: string;
  valor: ValoresDeBusca;
}

export interface OrdenarContrato {
  visivel: boolean;
  setVisivel: Function;
  callback: (selecionado: OrdenacaoConsultasContrato) => void;
  valorAtual: OrdenacaoConsultasContrato;
  valoresDeBusca: Array<ValoresDeBuscaContrato>;
}
