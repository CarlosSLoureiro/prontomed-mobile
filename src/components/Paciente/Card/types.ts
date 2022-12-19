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

interface MenuArchor {
  x: number;
  y: number;
}

interface MenuItem {
  titulo: string;
  icone: string;
  callback: () => void;
}

export interface PacienteMenuContrato {
  visivel: boolean;
  fecharMenu: () => void;
  menuAnchor?: MenuArchor;
  items: Array<MenuItem>;
}
