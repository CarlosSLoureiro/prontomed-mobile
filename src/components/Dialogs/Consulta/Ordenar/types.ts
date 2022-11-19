export interface ItemsSelecionados {
    ordem: string;
    chave: string;
}

export interface OrdenarContrato {
    visivel: boolean,
    setVisivel: Function,
    callback: (selecionado:ItemsSelecionados) => void;
}