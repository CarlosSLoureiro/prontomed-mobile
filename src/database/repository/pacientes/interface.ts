import Paciente from '@entity/paciente';

export default interface PacientesRepositoryInterface {
  getAll: () => Promise<Array<Paciente>>;
  create: (paciente: Partial<Paciente>) => Promise<Paciente>;
  delete: (id: number) => Promise<void>;
}
