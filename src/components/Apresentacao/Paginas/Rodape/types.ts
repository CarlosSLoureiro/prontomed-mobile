import { GestureResponderEvent } from "react-native";

export interface BotaoContrato {
    titulo: string | undefined;
    acao: ((event: GestureResponderEvent) => void) | undefined
}

export interface RodapeContrato {
    corDeFundo: string;
    tituloBotaoEsquerdo?: string;
    acaoBotaoEsquerdo?: ((event: GestureResponderEvent) => void),
    tituloBotaoDireito?: string,
    acaoBotaoDireito?: ((event: GestureResponderEvent) => void)
}