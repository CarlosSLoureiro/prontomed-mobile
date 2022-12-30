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

export interface ValoresStatusConsultas {
  mes: number;
  quantidade: number;
}

export interface StatusConsultas {
  totalDeConsultasPorMeses: Array<ValoresStatusConsultas>;
  totalDeConsultasFinalizadasPorMeses: Array<ValoresStatusConsultas>;
}

export interface ValoresStatusPacientes {
  idade: number;
  quantidade: number;
}

export type StatusPacientes = Array<ValoresStatusPacientes>;
