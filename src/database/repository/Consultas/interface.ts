import Consulta from '@entity/Consulta';
import Paciente from '@entity/Paciente';

export default interface ConsultasRepositoryInterface {
  listar: (pagina: number, filtros: any) => Promise<Array<Consulta>>;
  total: () => Promise<number>;
  agendar: (paciente: Paciente, data: Date) => Promise<Consulta>;
  obterPossivelConsultaEmConflito: (data: Date) => Promise<Consulta | undefined>;
  editar: (consulta: Partial<Consulta>) => Promise<Consulta>;
}
