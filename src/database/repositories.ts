import { DataSource } from 'typeorm';

import ConsultasRepository from '@repository/Consultas';
import PacientesRepository from '@repository/Pacientes';

import { Repositories } from './types';

export default (conexao: DataSource): Repositories => ({
  pacientesRepository: new PacientesRepository(conexao),
  consultasRepository: new ConsultasRepository(conexao)
});
