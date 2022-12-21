import Consulta from '@entity/Consulta';
import Paciente from '@entity/Paciente';

export interface PacientesContrato {
  paginaAtiva: boolean;
}

export type cadastrarEditarCallback = (dados: Partial<Paciente>) => Promise<Paciente | undefined>;

export type excluirCallback = (paciente: Paciente) => Promise<Paciente | undefined>;

export type agendaraConsultaCallback = (paciente: Paciente, data: Date) => Promise<Consulta | undefined>;
