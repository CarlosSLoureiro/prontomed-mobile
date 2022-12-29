import { MutableRefObject } from 'react';

import Observacao from '@entity/Observacao';

export interface ExcluirObservacaoRefContrato {
  abrirDialog: (consulta: Observacao) => void;
}

export interface ExcluirObservacaoContrato {
  visivel: boolean;
  setVisivel: Function;
  formularioRef?: MutableRefObject<ExcluirObservacaoRefContrato>;
  callback: (observacao: Partial<Observacao>) => Promise<Observacao | undefined>;
}
