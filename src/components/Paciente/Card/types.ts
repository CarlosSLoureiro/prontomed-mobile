import { MutableRefObject } from 'react';

import Paciente from '@entity/Paciente';

import { EditarPacienteContrato } from '../Dialogs/CadastrarEditar/types';
import { ExcluirPacienteRefContrato } from '../Dialogs/Excluir/types';

export interface PacienteCardContrato {
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
