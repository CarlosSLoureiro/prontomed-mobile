import { OrdenacaoPacientesContrato } from '@repository/Pacientes/types';

export interface ValoresDeBusca {
  titulo: string;
  valor: 'pacientes.nome' | 'pacientes.idade' | 'pacientes.peso' | 'pacientes.altura' | 'pacientes.id' | 'totalConsultas';
}

export interface OrdenarContrato {
  visivel: boolean;
  setVisivel: Function;
  callback: (selecionado: OrdenacaoPacientesContrato) => void;
  valorAtual: OrdenacaoPacientesContrato;
  valoresDeBusca: Array<ValoresDeBusca>;
}
