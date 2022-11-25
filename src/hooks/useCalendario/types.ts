import { NotifierInterface, ShowNotificationParams } from 'react-native-notifier/lib/typescript/types';

export interface CalendarioContrato {
  obterCelendario: () => Promise<string | null>;
  criarCalendario: () => Promise<string | null>;
  agendarConsulta: (nome: string) => Promise<string | null>;
}
