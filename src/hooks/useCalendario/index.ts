import * as Calendar from 'expo-calendar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Notification from '@hooks/useNotification';

import { CalendarioContrato } from './types';

class Calendario implements CalendarioContrato {
  private static _instancia: Calendario;

  private readonly variavel = 'ProntoMed:ID_CALENDARIO';

  public static get Instancia (): Calendario {
    return this._instancia || (this._instancia = new this());
  }

  private async obterCelendario (id: string): Promise<string | null> {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
      const calendarios = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      const calendarioProntoMed = calendarios.filter(each => each.id === id);
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

  private async obterCalendarioID (): Promise<string | null> {
    const id = await AsyncStorage.getItem(this.variavel);

    let calendarioId: string | null = null;

    if (id !== null) {
      calendarioId = await this.obterCelendario(id);
    }

    if (calendarioId === null) {
      calendarioId = await this.criarCalendario();

      if (calendarioId !== null) {
        await AsyncStorage.setItem(this.variavel, calendarioId);
      }
    }

    return calendarioId;
  }

  private async criarCalendario (): Promise<string | null> {
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

  public async removerConsulta (params: Partial<Calendar.Event>): Promise<void> {
    const calendarioId = await this.obterCalendarioID();

    if (calendarioId === null || params.id === undefined) {
      Notification.error({
        title: 'Não foi possível remover a consulta!',
        description: 'Você precisa permitir que o ProntoMed possa acessar seu calendário',
        duration: 5000
      });
      return undefined;
    }

    await Calendar.deleteEventAsync(params.id, {});
  }

  public async agendarConsulta (params: Partial<Calendar.Event>): Promise<string | undefined> {
    const calendarioId = await this.obterCalendarioID();

    if (calendarioId === null) {
      Notification.error({
        title: 'Não foi possível agendar a consulta!',
        description: 'Você precisa permitir que o ProntoMed possa acessar seu calendário',
        duration: 5000
      });
      return undefined;
    }

    return await Calendar.createEventAsync(calendarioId, params);
  }
}

export default Calendario.Instancia;
