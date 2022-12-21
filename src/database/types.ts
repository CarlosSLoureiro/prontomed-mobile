import ConsultasRepository from '@repository/Consultas';
import PacientesRepository from '@repository/Pacientes';

export interface Repositories {
  pacientesRepository: PacientesRepository;
  consultasRepository: ConsultasRepository;
}
