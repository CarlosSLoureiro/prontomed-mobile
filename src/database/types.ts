import ConsultasRepository from '@repository/Consultas';
import ObservacoesRepository from '@repository/Observacoes';
import PacientesRepository from '@repository/Pacientes';

export interface Repositories {
  pacientesRepository: PacientesRepository;
  consultasRepository: ConsultasRepository;
  observacoesRepository: ObservacoesRepository;
}
