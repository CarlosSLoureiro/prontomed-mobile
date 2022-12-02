import { DataSource } from 'typeorm';

import PacientesRepository from '@repository/pacientes';

import { DatabaseContextData } from './types';

export default (conexao: DataSource): DatabaseContextData => ({
  pacientesRepository: new PacientesRepository(conexao)
});
