import { MutableRefObject } from 'react';

import Observacao from '@entity/Observacao';

import { EditarObservacaoRefContrato } from '../CadastrarEditar/types';

export interface ObsMensagemContrato {
  observacao: Observacao;
  editarObservacaoRef: MutableRefObject<EditarObservacaoRefContrato>;
}
