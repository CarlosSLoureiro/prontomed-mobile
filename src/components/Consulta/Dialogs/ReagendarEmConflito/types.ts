import Consulta from '@entity/Consulta';

import { reagendarCallback } from '@screens/Principal/Consultas/types';

export interface ReagendarEmConflitoContrato {
  visivel: boolean;
  setVisivel: Function;
  mensagem: string;
  consulta: Consulta | undefined;
  callback: reagendarCallback;
}
