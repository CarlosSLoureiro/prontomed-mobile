import { MutableRefObject } from 'react';

import Paciente from '@entity/Paciente';

import { AgendarConsultaRefContrato } from '../Dialogs/AgendarConsulta/types';
import { EditarPacienteContrato } from '../Dialogs/CadastrarEditar/types';
import { ExcluirPacienteRefContrato } from '../Dialogs/Excluir/types';

export interface PacienteCardContrato {
  agendarFormularioRef?: MutableRefObject<AgendarConsultaRefContrato>;
  editarFormularioRef?: MutableRefObject<EditarPacienteContrato>;
  excluirFormularioRef?: MutableRefObject<ExcluirPacienteRefContrato>;
  paciente: Paciente;
  ultimo?: boolean;
}
