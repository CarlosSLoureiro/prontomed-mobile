import { MutableRefObject } from 'react';

import Paciente from '@entity/Paciente';

import { agendaraConsultaCallback } from '@screens/Principal/Pacientes/types';

export interface AgendarConsultaRefContrato {
  abrirDialog: (paciente: Paciente, dataConsulta?: Date) => void;
}

export interface AgendarConsultaContrato {
  formularioRef?: MutableRefObject<AgendarConsultaRefContrato>;
  callback: agendaraConsultaCallback;
}
