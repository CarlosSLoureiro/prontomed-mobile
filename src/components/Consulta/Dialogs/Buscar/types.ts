import { generos, tipos_sanguineos } from "@utils/enums/paciente";
import { BuscaContrato } from "@screens/Principal/Consultas/types";

export interface ItemListagemDeGenerosContrato {
    _id: string;
    value: generos;
}

export interface ListagemDeGenerosContrato {
    valor: string,
    listagem: Array<ItemListagemDeGenerosContrato>,
    selecionados: Array<ItemListagemDeGenerosContrato>,
}

export interface ItemListagemDeTiposSanguineosContrato {
    _id: string;
    value: tipos_sanguineos;
}

export interface ListagemDeTiposSanguineosContrato {
    valor: string,
    listagem: Array<ItemListagemDeTiposSanguineosContrato>,
    selecionados: Array<ItemListagemDeTiposSanguineosContrato>,
}

export interface ValoresAtuaisFormulario {
    nome: string;
    generos: ListagemDeGenerosContrato;
    tipos_sanguineos: ListagemDeTiposSanguineosContrato;
}

export interface BuscarContrato {
    visivel: boolean,
    setVisivel: Function,
    callback: (busca?:BuscaContrato) => void;
}