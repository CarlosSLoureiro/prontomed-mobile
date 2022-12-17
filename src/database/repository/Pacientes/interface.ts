import { FindOneOptions } from 'typeorm';

import Paciente from '@entity/Paciente';

import { FiltrosDeBuscarPacientesContrato } from './types';

export default interface PacientesRepositoryInterface {
  encontrar: (opcoes: FindOneOptions<Paciente>) => Promise<Paciente | undefined>;
  listar: (pagina: number, filtros: FiltrosDeBuscarPacientesContrato) => Promise<Array<Paciente>>;
  total: () => Promise<number>;
  cadastrar: (paciente: Partial<Paciente>) => Promise<Paciente>;
  editar: (paciente: Partial<Paciente>) => Promise<Paciente>;
  deletar: (id: number) => Promise<void>;
}
