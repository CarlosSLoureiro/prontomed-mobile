import { DatasContrato } from "@screens/Principal/Consultas/types";

export interface FiltrarDatasContrato {
    visivel: boolean,
    setVisivel: Function,
    callback: (datas:DatasContrato) => void;
}