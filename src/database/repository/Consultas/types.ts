export type ValoresDeBuscaConsultas = 'dataAgendada' | 'id';

export type ValoresDeOrdemConsultas = 'decrescente' | 'crescente';

export interface BuscarConsultasContrato {
  valor: string;
  finalizadas: boolean;
}

export interface DatasConsultasContrato {
  inicio: Date;
  fim: Date;
}

export interface OrdenacaoConsultasContrato {
  ordem: ValoresDeOrdemConsultas;
  chave: ValoresDeBuscaConsultas;
}

export interface FiltrosDeBuscarConsultasContrato {
  busca?: BuscarConsultasContrato;
  datas?: DatasConsultasContrato;
  ordenacao: OrdenacaoConsultasContrato;
}
