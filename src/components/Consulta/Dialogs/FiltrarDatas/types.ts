import { DatasConsultasContrato } from '@repository/Consultas/types';

export interface FiltrarDatasContrato {
  visivel: boolean;
  setVisivel: Function;
  callback: (datas: DatasConsultasContrato) => void;
  valorAtual: DatasConsultasContrato | undefined;
}
