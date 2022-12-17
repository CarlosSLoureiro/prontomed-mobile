import { MutableRefObject } from 'react';

import Paciente from '@entity/Paciente';

export type EditarPacienteContrato = (paciente: Paciente) => void;

export interface CadastrarPacienteContrato {
  formularioRef?: MutableRefObject<EditarPacienteContrato>;
  visivel: boolean;
  setVisivel: Function;
  callback: (dados: Partial<Paciente>) => Promise<Paciente | undefined>;
}
