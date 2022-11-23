export interface ConsultasContrato {
    paginaAtiva: boolean;
}

export interface DatasContrato {
    inicio: Date;
    fim: Date;
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