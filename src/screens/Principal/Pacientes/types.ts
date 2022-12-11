import { BuscarPacienteCallbackContrato } from '@components/Paciente/Dialogs/Buscar/types';

export interface PacientesContrato {
  paginaAtiva: boolean;
}

export interface OrdenacaoContrato {
  ordem: string;
  chave: string;
}

export interface FiltrosDeBuscaContrato {
  busca?: BuscarPacienteCallbackContrato;
  ordenacao: OrdenacaoContrato;
}
