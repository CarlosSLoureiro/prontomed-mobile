export interface BuscarContrato {
    visivel: boolean,
    setVisivel: Function,
    callback: () => void;
}

export interface BuscarEntreDatasContrato {
    dataInicio: Date;
    dataFim: Date;
}