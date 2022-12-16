import { OrdenacaoPacientesContrato } from '@repository/Pacientes/types';

export interface ValoresDeBusca {
  titulo: string;
  valor: string;
}

export interface OrdenarContrato {
  visivel: boolean;
  setVisivel: Function;
  callback: (selecionado: OrdenacaoPacientesContrato) => void;
  valorAtual: OrdenacaoPacientesContrato;
  valoresDeBusca: Array<ValoresDeBusca>;
}
