import { BuscarConsultasContrato } from '@repository/Consultas/types';

export interface BuscarConsultaContrato {
  visivel: boolean;
  setVisivel: Function;
  callback: (busca?: BuscarConsultasContrato) => void;
  valorAtual?: BuscarConsultasContrato;
}
