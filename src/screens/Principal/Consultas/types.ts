export interface ConsultasContrato {
    paginaAtiva: boolean;
}

export interface DatasContrato {
    dataInicio: Date;
    dataFim: Date;
}

export interface OrdenacaoContrato {
    ordem: string;
    chave: string;
}

export interface FiltrosDeBuscaContrato {
    busca?: any;
    datas?: DatasContrato;
    ordenacao: OrdenacaoContrato
}