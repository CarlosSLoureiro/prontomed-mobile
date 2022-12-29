import * as Calendar from 'expo-calendar';

export default interface CalendarioContrato {
  agendarConsulta: (params: Partial<Calendar.Event>) => Promise<string | undefined>;
}
