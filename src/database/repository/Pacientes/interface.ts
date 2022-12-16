import Paciente from '@entity/Paciente';

export default interface PacientesRepositoryInterface {
  listar: (pagina: number) => Promise<Array<Paciente>>;
  cadastrar: (paciente: Partial<Paciente>) => Promise<Paciente>;
  deletar: (id: number) => Promise<void>;
  total: () => Promise<number>;
}
