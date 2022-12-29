import { MutableRefObject } from 'react';

import Consulta from '@entity/Consulta';

import { finalizarReabrirCallback } from '@screens/Principal/Consultas/types';

export interface FinalizarReabrirConsultaRefContrato {
  abrirDialog: (consulta: Consulta, finalizar: boolean) => void;
}

export interface ExcluirConsultaContrato {
  visivel: boolean;
  setVisivel: Function;
  formularioRef?: MutableRefObject<FinalizarReabrirConsultaRefContrato>;
  callbackFinalizar: finalizarReabrirCallback;
  callbackReabrir: finalizarReabrirCallback;
}
