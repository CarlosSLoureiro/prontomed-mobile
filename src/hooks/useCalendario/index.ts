import * as Calendar from 'expo-calendar';

import Notification from '@hooks/useNotification';

import { CalendarioContrato } from './types';

class Calendario implements CalendarioContrato {
  private static _instancia: Calendario;

  public static get Instancia (): Calendario {
    return this._instancia || (this._instancia = new this());
  }

  public async obterCelendario (): Promise<string | null> {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
      const calendarios = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      // TODO: futuramente, para possibilitar a troca do título do calendário, deverá ser salvo no SQLLite o 'each.id' do calendário
      const calendarioProntoMed = calendarios.filter(each => each.title === 'ProntoMed');
      const calendario = calendarioProntoMed[0]?.id ?? null;
      return calendario;
    } else {
      Notification.error({
        title: 'Sem acesso ao calendário!',
        description: 'Você precisa permitir que o ProntoMed possa acessar seu calendário',
        duration: 10000
      });
      return null;
    }
  }

  public async criarCalendario (): Promise<string | null> {
    const calendarioId = await Calendar.createCalendarAsync({
      title: 'ProntoMed',
      color: 'yellow',
      entityType: Calendar.EntityTypes.EVENT,
      name: 'internalCalendarName',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER
    });

    return calendarioId ?? null;
  }

  public async agendarConsulta (nome: string): Promise<string | null> {
    let calendario = await this.obterCelendario();

    if (calendario === null) {
      calendario = await this.criarCalendario();
    }

    if (calendario === null) {
      Notification.error({
        title: 'Não foi possível agendar a consulta!',
        duration: 3000
      });
      return null;
    }

    const eventoId = await Calendar.createEventAsync(calendario, {
      title: `Consulta com ${nome}`,
      startDate: new Date('2022-11-20 22:00:00'),
      endDate: new Date('2022-11-20 23:00:00')
    });

    return eventoId ?? null;
  }
}

export default Calendario.Instancia;