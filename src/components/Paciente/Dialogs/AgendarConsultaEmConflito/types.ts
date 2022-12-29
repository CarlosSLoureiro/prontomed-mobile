import Consulta from '@entity/Consulta';

import { agendarConsultaCallback } from '@screens/Principal/Pacientes/types';

export interface AgendarConsultaEmConflitoContrato {
  visivel: boolean;
  setVisivel: Function;
  mensagem: string;
  consulta: Partial<Consulta>;
  callback: agendarConsultaCallback;
}
