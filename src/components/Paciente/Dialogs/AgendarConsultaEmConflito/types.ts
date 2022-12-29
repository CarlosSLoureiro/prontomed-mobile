import Consulta from '@entity/Consulta';

import { agendaraConsultaCallback } from '@screens/Principal/Pacientes/types';

export interface AgendarConsultaEmConflitoContrato {
  visivel: boolean;
  setVisivel: Function;
  mensagem: string;
  consulta: Partial<Consulta>;
  callback: agendaraConsultaCallback;
}
