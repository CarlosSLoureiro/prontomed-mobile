import Paciente from '@entity/Paciente';

export interface PacientesContrato {
  paginaAtiva: boolean;
}

export type cadastrarEditarCallback = (dados: Partial<Paciente>) => Promise<Paciente | undefined>;
