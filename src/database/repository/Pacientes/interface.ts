import Paciente from '@entity/Paciente';

export default interface PacientesRepositoryInterface {
  getAll: (pagina: number) => Promise<Array<Paciente>>;
  cadastrar: (paciente: Partial<Paciente>) => Promise<Paciente>;
  delete: (id: number) => Promise<void>;
  total: () => Promise<number>;
}
