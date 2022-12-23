import { OrdenacaoPacientesContrato, ValoresDeBusca } from '@repository/Pacientes/types';

export interface ValoresDeBuscaContrato {
  titulo: string;
  valor: ValoresDeBusca;
}

export interface OrdenarContrato {
  visivel: boolean;
  setVisivel: Function;
  callback: (selecionado: OrdenacaoPacientesContrato) => void;
  valorAtual: OrdenacaoPacientesContrato;
  valoresDeBusca: Array<ValoresDeBuscaContrato>;
}
