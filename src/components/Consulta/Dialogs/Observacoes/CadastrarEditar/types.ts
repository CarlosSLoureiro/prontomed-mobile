import { MutableRefObject } from 'react';

import Consulta from '@entity/Consulta';
import Observacao from '@entity/Observacao';

export interface EditarObservacaoRefContrato {
  abrirDialog: (observacao: Observacao) => void;
}

export interface CadastrarObservacaoContrato {
  visivel: boolean;
  setVisivel: Function;
  formularioRef?: MutableRefObject<EditarObservacaoRefContrato>;
  callback: (observacao: Partial<Observacao>) => Promise<Consulta | undefined>;
}
