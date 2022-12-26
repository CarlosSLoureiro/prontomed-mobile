import { MutableRefObject } from 'react';

import Consulta from '@entity/Consulta';

export interface ExibirObservacoesRefContrato {
  abrirDialog: (consulta: Consulta) => void;
}

export type observarCallback = (consulta: Consulta) => Promise<Consulta | undefined>;

export interface ExibirObservacoesContrato {
  visivel: boolean;
  setVisivel: Function;
  formularioRef?: MutableRefObject<ExibirObservacoesRefContrato>;
  callback: observarCallback;
}
