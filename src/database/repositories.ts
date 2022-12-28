import { DataSource } from 'typeorm';

import ConsultasRepository from '@repository/Consultas';
import ObservacoesRepository from '@repository/Observacoes';
import PacientesRepository from '@repository/Pacientes';

import { Repositories } from './types';

export default (conexao: DataSource): Repositories => ({
  pacientesRepository: new PacientesRepository(conexao),
  consultasRepository: new ConsultasRepository(conexao),
  observacoesRepository: new ObservacoesRepository(conexao)
});
