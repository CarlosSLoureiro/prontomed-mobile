import { generos, tipos_sanguineos } from "@utils/enums/paciente";

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

export interface BuscaContrato {
    nome: string;
    generos: Array<generos>;
    tipos_sanguineos: Array<tipos_sanguineos>;
}

export interface FiltrosDeBuscaContrato {
    busca?: BuscaContrato;
    datas?: DatasContrato;
    ordenacao: OrdenacaoContrato
}