export interface BuscarContrato {
    visivel: boolean,
    setVisivel: Function,
    callback: () => void;
}

export interface ListagemDeGenerosContrato {
    _id: string;
    value: string;
}
export interface BuscarGenerosContrato {
    valor: string,
    listagem: Array<ListagemDeGenerosContrato>,
    selecionados: Array<ListagemDeGenerosContrato>,
}