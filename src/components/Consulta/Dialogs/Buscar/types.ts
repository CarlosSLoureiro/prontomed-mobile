import { BuscarConsultasContrato } from '@repository/Consultas/types';

export interface ValoresAtuaisFormulario {
  valor: string;
}
export interface BuscarConsultaContrato {
  visivel: boolean;
  setVisivel: Function;
  callback: (busca?: BuscarConsultasContrato) => void;
  valorAtual?: ValoresAtuaisFormulario;
}
