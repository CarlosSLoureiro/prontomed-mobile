export type ValoresDeBusca = 'dataAgendada' | 'id';

export type ValoresDeOrdem = 'decrescente' | 'crescente';

export interface BuscarConsultasContrato {
  valor: string;
  finalizadas: boolean;
}

export interface DatasConsultasContrato {
  inicio: Date;
  fim: Date;
}

export interface OrdenacaoConsultasContrato {
  ordem: ValoresDeOrdem;
  chave: ValoresDeBusca;
}

export interface FiltrosDeBuscarConsultasContrato {
  busca?: BuscarConsultasContrato;
  datas?: DatasConsultasContrato;
  ordenacao: OrdenacaoConsultasContrato;
}
