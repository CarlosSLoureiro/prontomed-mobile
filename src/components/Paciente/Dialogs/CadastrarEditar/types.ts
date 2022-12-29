import { MutableRefObject } from 'react';

import Paciente from '@entity/Paciente';

import { cadastrarEditarCallback } from '@screens/Principal/Pacientes/types';

export interface EditarPacienteContrato {
  abrirDialog: (paciente: Paciente) => void;
}

export interface CadastrarPacienteContrato {
  visivel: boolean;
  setVisivel: Function;
  formularioRef?: MutableRefObject<EditarPacienteContrato>;
  cadastrarCallback: cadastrarEditarCallback;
  editarCallback: cadastrarEditarCallback;
}
