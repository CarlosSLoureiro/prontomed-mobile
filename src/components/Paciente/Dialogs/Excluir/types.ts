import { MutableRefObject } from 'react';

import Paciente from '@entity/Paciente';

import { excluirCallback } from '@screens/Principal/Pacientes/types';

export interface ExcluirPacienteRefContrato {
  abrirDialog: (paciente: Paciente) => void;
}

export interface ExcluirPacienteContrato {
  formularioRef?: MutableRefObject<ExcluirPacienteRefContrato>;
  callback: excluirCallback;
}
