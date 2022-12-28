import { MutableRefObject } from 'react';

import Consulta from '@entity/Consulta';
import Observacao from '@entity/Observacao';

export interface ExibirObservacoesRefContrato {
  abrirDialog: (consulta: Consulta) => void;
}

export type observarCallback = (consulta: Consulta, observacao: Partial<Observacao>) => Promise<Observacao | undefined>;

export interface ExibirObservacoesContrato {
  visivel: boolean;
  setVisivel: Function;
  formularioRef?: MutableRefObject<ExibirObservacoesRefContrato>;
  callback: observarCallback;
}
