import Consulta from '@entity/Consulta';
import Paciente from '@entity/Paciente';

export default interface ConsultasRepositoryInterface {
  listar: (pagina: number, quantidade: number, filtros: any) => Promise<Array<Consulta>>;
  total: () => Promise<number>;
  totalAgendadas: () => Promise<number>;
  totalAtrasadas: () => Promise<number>;
  agendar: (paciente: Paciente, data: Date) => Promise<Consulta>;
  obterPossivelConsultaEmConflito: (data: Date, ignorarIds?: Array<number>) => Promise<Consulta | undefined>;
  editar: (consulta: Partial<Consulta>) => Promise<Consulta>;
  excluir: (consulta: Consulta) => Promise<Consulta>;
}
