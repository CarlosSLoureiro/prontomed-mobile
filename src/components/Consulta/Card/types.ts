import { MutableRefObject } from 'react';

import Consulta from '@entity/Consulta';

import { ExcluirConsultaRefContrato } from '../Dialogs/Excluir/types';
import { ExibirObservacoesRefContrato } from '../Dialogs/Observacoes/types';

export interface ConsultaCardContrato {
  excluirFormularioRef?: MutableRefObject<ExcluirConsultaRefContrato>;
  observacoesFormularioRef?: MutableRefObject<ExibirObservacoesRefContrato>;
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
