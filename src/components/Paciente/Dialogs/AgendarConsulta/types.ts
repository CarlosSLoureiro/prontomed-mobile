import { MutableRefObject } from 'react';

import Paciente from '@entity/Paciente';

import { agendarConsultaCallback } from '@screens/Principal/Pacientes/types';

export interface AgendarConsultaRefContrato {
  abrirDialog: (paciente: Paciente, dataConsulta?: Date) => void;
}

export interface AgendarConsultaContrato {
  visivel: boolean;
  setVisivel: Function;
  formularioRef?: MutableRefObject<AgendarConsultaRefContrato>;
  callback: agendarConsultaCallback;
}
