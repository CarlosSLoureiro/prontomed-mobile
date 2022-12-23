import { OrdenacaoConsultasContrato } from '@repository/Consultas/types';

export interface OrdenarContrato {
  visivel: boolean;
  setVisivel: Function;
  callback: (selecionado: OrdenacaoConsultasContrato) => void;
  valorAtual: OrdenacaoConsultasContrato;
}
