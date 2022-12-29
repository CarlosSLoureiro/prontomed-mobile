import { MutableRefObject } from 'react';

import Consulta from '@entity/Consulta';

import { reagendarCallback } from '@screens/Principal/Consultas/types';

export interface ReagendarConsultaRefContrato {
  abrirDialog: (consulta: Consulta) => void;
}

export interface ReagendarConsultaContrato {
  visivel: boolean;
  setVisivel: Function;
  formularioRef?: MutableRefObject<ReagendarConsultaRefContrato>;
  callback: reagendarCallback;
}
