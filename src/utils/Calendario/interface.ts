import Consulta from '@entity/Consulta';

export default interface CalendarioUtilsInterface {
  removerConsulta: (consulta: Consulta) => Promise<string | null>;
  agendarConsulta: (consulta: Consulta) => Promise<string | undefined>;
}
