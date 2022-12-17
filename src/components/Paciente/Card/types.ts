import { MutableRefObject } from 'react';

import Paciente from '@entity/Paciente';

import { EditarPacienteContrato } from '../Dialogs/Cadastrar/types';

export interface PacienteCardContrato {
  formularioRef?: MutableRefObject<EditarPacienteContrato>;
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
