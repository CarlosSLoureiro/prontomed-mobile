import Consulta from '@entity/Consulta';

export interface ConsultasContrato {
  paginaAtiva: boolean;
}

export type excluirCallback = (consulta: Consulta) => Promise<Consulta | undefined>;
