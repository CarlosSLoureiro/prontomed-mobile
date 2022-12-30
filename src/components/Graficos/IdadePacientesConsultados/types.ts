import { StatusPacientes as StatusPacientesConsultados } from '@repository/Consultas/types';

export interface GraficoContrato {
  dados: StatusPacientesConsultados | undefined;
}
