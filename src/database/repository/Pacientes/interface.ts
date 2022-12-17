import Paciente from '@entity/Paciente';

import { FiltrosDeBuscarPacientesContrato } from './types';

export default interface PacientesRepositoryInterface {
  listar: (pagina: number, filtros: FiltrosDeBuscarPacientesContrato) => Promise<Array<Paciente>>;
  cadastrar: (paciente: Partial<Paciente>) => Promise<Paciente>;
  deletar: (id: number) => Promise<void>;
  total: () => Promise<number>;
}
