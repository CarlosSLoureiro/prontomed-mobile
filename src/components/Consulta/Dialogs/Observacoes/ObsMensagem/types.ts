import { MutableRefObject } from 'react';

import Observacao from '@entity/Observacao';

import { EditarObservacaoRefContrato } from '../CadastrarEditar/types';
import { ExcluirObservacaoRefContrato } from '../Excluir/types';

export interface ObsMensagemContrato {
  observacao: Observacao;
  editarObservacaoRef: MutableRefObject<EditarObservacaoRefContrato>;
  excluirObservacaoRef: MutableRefObject<ExcluirObservacaoRefContrato>;
}
