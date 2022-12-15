import Paciente from '@entity/Paciente';

export interface CadastrarPacienteContrato {
  visivel: boolean;
  setVisivel: Function;
  callback: (dados: Partial<Paciente>) => void;
}
