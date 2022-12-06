import { Generos, TiposSanguineos } from '@entity/paciente/enums';

export interface PacientesContrato {
  paginaAtiva: boolean;
}

export interface OrdenacaoContrato {
  ordem: string;
  chave: string;
}

export interface BuscaContrato {
  nome: string;
  generos: Array<Generos>;
  tipos_sanguineos: Array<TiposSanguineos>;
}

export interface FiltrosDeBuscaContrato {
  busca?: BuscaContrato;
  ordenacao: OrdenacaoContrato;
}
