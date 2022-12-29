import { MutableRefObject } from 'react';

import Consulta from '@entity/Consulta';

import { ExcluirConsultaRefContrato } from '../Dialogs/Excluir/types';
import { FinalizarReabrirConsultaRefContrato } from '../Dialogs/FinalizarReabrir/types';
import { ExibirObservacoesRefContrato } from '../Dialogs/Observacoes/types';
import { ReagendarConsultaRefContrato } from '../Dialogs/Reagendar/types';

export interface ConsultaCardContrato {
  reagendarFormularioRef?: MutableRefObject<ReagendarConsultaRefContrato>;
  excluirFormularioRef?: MutableRefObject<ExcluirConsultaRefContrato>;
  observacoesFormularioRef?: MutableRefObject<ExibirObservacoesRefContrato>;
  finalizarReabrirFormularioRef?: MutableRefObject<FinalizarReabrirConsultaRefContrato>;
  consulta: Consulta;
  ultimo?: boolean;
}
