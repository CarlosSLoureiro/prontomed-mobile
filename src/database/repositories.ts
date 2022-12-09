import { DataSource } from 'typeorm';

import PacientesRepository from '@repository/Pacientes';

import { Repositories } from './types';

export default (conexao: DataSource): Repositories => ({
  pacientesRepository: new PacientesRepository(conexao)
});
