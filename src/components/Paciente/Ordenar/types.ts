import { OrdenacaoContrato } from '@screens/Principal/Pacientes/types';

export interface ValoresDeBusca {
  titulo: string;
  valor: string;
}

export interface OrdenarContrato {
  visivel: boolean;
  setVisivel: Function;
  callback: (selecionado: OrdenacaoContrato) => void;
  valorAtual: OrdenacaoContrato;
  valoresDeBusca: Array<ValoresDeBusca>;
}
