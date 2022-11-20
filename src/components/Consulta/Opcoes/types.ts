interface LimparContrato {
    visivel: boolean;
    callback: () => void;
}

export interface OcpoesBotaoContrato {
    visivel: boolean,
    buscar: () => void,
    filtrarDatas: () => void,
    ordenar: () => void,
    limpar: LimparContrato;
}