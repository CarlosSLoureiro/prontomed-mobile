import { MutableRefObject } from 'react';

import Paciente from '@entity/Paciente';

import { agendaraConsultaCallback } from '@screens/Principal/Pacientes/types';

export type AgendarConsultaRefContrato = (paciente: Paciente) => void;

export interface AgendarConsultaContrato {
  formularioRef?: MutableRefObject<AgendarConsultaRefContrato>;
  callback: agendaraConsultaCallback;
}
