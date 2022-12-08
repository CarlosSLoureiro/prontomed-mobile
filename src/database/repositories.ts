import { DataSource } from 'typeorm';

import PacientesRepository from '@repository/pacientes';

import { Repositories } from './types';

export default (conexao: DataSource): Repositories => ({
  pacientesRepository: new PacientesRepository(conexao)
});
