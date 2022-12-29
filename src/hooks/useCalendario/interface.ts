import * as Calendar from 'expo-calendar';

export default interface CalendarioInterface {
  agendarConsulta: (params: Partial<Calendar.Event>) => Promise<string | undefined>;
}
