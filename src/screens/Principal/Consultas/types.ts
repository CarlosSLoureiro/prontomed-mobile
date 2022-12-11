import { Generos, TiposSanguineos } from '@entity/Paciente/enums';

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
  generos: Array<Generos>;
  tipos_sanguineos: Array<TiposSanguineos>;
}

export interface FiltrosDeBuscaContrato {
  busca?: BuscaContrato;
  datas?: DatasContrato;
  ordenacao: OrdenacaoContrato;
}
