import { MutableRefObject } from 'react';

import Consulta from '@entity/Consulta';

export interface ConsultaCardContrato {
  reagendarFormularioRef?: MutableRefObject<any>;
  excluirFormularioRef?: MutableRefObject<any>;
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
