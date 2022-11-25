import { OrdenacaoContrato } from '@screens/Principal/Consultas/types';

export interface OrdenarContrato {
  visivel: boolean;
  setVisivel: Function;
  callback: (selecionado: OrdenacaoContrato) => void;
  valorAtual: OrdenacaoContrato;
}
