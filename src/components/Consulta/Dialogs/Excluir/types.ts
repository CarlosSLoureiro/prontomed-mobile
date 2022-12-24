import { MutableRefObject } from 'react';

import Consulta from '@entity/Consulta';

import { excluirCallback } from '@screens/Principal/Consultas/types';

export interface ExcluirConsultaRefContrato {
  abrirDialog: (consulta: Consulta) => void;
}

export interface ExcluirConsultaContrato {
  formularioRef?: MutableRefObject<ExcluirConsultaRefContrato>;
  callback: excluirCallback;
}
