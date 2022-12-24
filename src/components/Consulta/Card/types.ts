import { MutableRefObject } from 'react';

import Consulta from '@entity/Consulta';

import { ExcluirConsultaRefContrato } from '../Dialogs/Excluir/types';

export interface ConsultaCardContrato {
  excluirFormularioRef?: MutableRefObject<ExcluirConsultaRefContrato>;
  finalizarConsulta: (consulta: Consulta) => Promise<void>;
  consulta: Consulta;
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

export interface ConsultaMenuContrato {
  visivel: boolean;
  fecharMenu: () => void;
  menuAnchor?: MenuArchor;
  items: Array<MenuItem>;
}
