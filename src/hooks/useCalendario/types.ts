import * as Calendar from 'expo-calendar';

export interface CalendarioContrato {
  agendarConsulta: (params: Partial<Calendar.Event>) => Promise<string | undefined>;
}
