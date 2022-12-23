import { OrdenacaoPacientesContrato, ValoresDeBuscaPacientes } from '@repository/Pacientes/types';

export interface ValoresDeBuscaPacientesContrato {
  titulo: string;
  valor: ValoresDeBuscaPacientes;
}

export interface OrdenarContrato {
  visivel: boolean;
  setVisivel: Function;
  callback: (selecionado: OrdenacaoPacientesContrato) => void;
  valorAtual: OrdenacaoPacientesContrato;
  valoresDeBusca: Array<ValoresDeBuscaPacientesContrato>;
}
