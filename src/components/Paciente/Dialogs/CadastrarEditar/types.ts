import { MutableRefObject } from 'react';

import Paciente from '@entity/Paciente';

import { cadastrarEditarCallback } from '@screens/Principal/Pacientes/types';

export interface EditarPacienteContrato {
  abrirDialog: (paciente: Paciente) => void;
}

export interface CadastrarPacienteContrato {
  formularioRef?: MutableRefObject<EditarPacienteContrato>;
  visivel: boolean;
  setVisivel: Function;
  cadastrarCallback: cadastrarEditarCallback;
  editarCallback: cadastrarEditarCallback;
}
