import Consulta from '@entity/Consulta';

export default interface CalendarioUtilsInterface {
  removerConsulta: (consulta: Consulta, forcado: boolean) => Promise<string | null>;
  agendarConsulta: (consulta: Consulta) => Promise<string | undefined>;
}
