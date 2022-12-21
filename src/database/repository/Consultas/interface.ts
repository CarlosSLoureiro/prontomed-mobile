import Consulta from '@entity/Consulta';
import Paciente from '@entity/Paciente';

export default interface ConsultasRepositoryInterface {
  agendar: (paciente: Paciente, data: Date) => Promise<Consulta>;
  obterPossivelConsultaEmConflito: (data: Date) => Promise<Consulta | undefined>;
}
