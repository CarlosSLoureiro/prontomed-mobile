import { MutableRefObject } from 'react';

import Consulta from '@entity/Consulta';

export interface ExibirObservacoesRefContrato {
  abrirDialog: (consulta: Consulta) => void;
}

export type observarCallback = (consulta: Consulta) => Promise<Consulta | undefined>;

export interface ExcluirConsultaContrato {
  formularioRef?: MutableRefObject<ExibirObservacoesRefContrato>;
  callback: observarCallback;
}
