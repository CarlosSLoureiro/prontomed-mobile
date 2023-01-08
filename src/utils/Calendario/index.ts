import * as expoCalendar from 'expo-calendar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Consulta from '@entity/Consulta';

import Notification from '@utils/Notification';

import { Ajustes } from '@screens/Principal/Ajustes/enums';

import CalendarioUtilsInterface from './interface';

import moment from 'moment';

class CalendarioUtils implements CalendarioUtilsInterface {
  private static _instancia: CalendarioUtils;
  private readonly variavel = 'ProntoMed:ID_CALENDARIO';

  public static get Instancia (): CalendarioUtils {
    return this._instancia || (this._instancia = new this());
  }

  private async obterCelendario (id: string): Promise<string | null> {
    const { status } = await expoCalendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
      const calendarios = await expoCalendar.getCalendarsAsync(expoCalendar.EntityTypes.EVENT);
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
    const calendarioId = await expoCalendar.createCalendarAsync({
      title: 'ProntoMed',
      color: 'yellow',
      entityType: expoCalendar.EntityTypes.EVENT,
      name: 'internalCalendarName',
      ownerAccount: 'personal',
      accessLevel: expoCalendar.CalendarAccessLevel.OWNER
    });

    return calendarioId ?? null;
  }

  private async removerEvento (params: Partial<expoCalendar.Event>): Promise<void> {
    const calendarioId = await this.obterCalendarioID();

    if (calendarioId === null || params.id === undefined) {
      Notification.error({
        title: 'Não foi possível remover a consulta!',
        description: 'Você precisa permitir que o ProntoMed possa acessar seu calendário',
        duration: 5000
      });
      return undefined;
    }

    await expoCalendar.deleteEventAsync(params.id, {});
  }

  private async agendarEvento (params: Partial<expoCalendar.Event>): Promise<string | undefined> {
    const calendarioId = await this.obterCalendarioID();

    if (calendarioId === null) {
      Notification.error({
        title: 'Não foi possível agendar a consulta!',
        description: 'Você precisa permitir que o ProntoMed possa acessar seu calendário',
        duration: 5000
      });
      return undefined;
    }

    return await expoCalendar.createEventAsync(calendarioId, params);
  }

  private async temPermissao (): Promise<boolean> {
    return await AsyncStorage.getItem(`ProntoMed:${Ajustes.CALENDARIO}`) === 'true';
  }

  public async removerConsulta (consulta: Consulta, forcado = false): Promise<string | null> {
    const permissao = await this.temPermissao();
    const agora = new Date();
    const podeRemover = (consulta.dataAgendada > agora || forcado);
    if (permissao && podeRemover && consulta.evento !== null) {
      await this.removerEvento({
        id: consulta.evento
      });
      return null;
    }

    return consulta.evento;
  }

  public async agendarConsulta (consulta: Consulta): Promise<string | null> {
    const permissao = await this.temPermissao();
    const agora = new Date();
    const podeAgendar = (consulta.dataAgendada > agora);
    if (permissao && podeAgendar) {
      const evento = await this.agendarEvento({
        title: `Consulta com ${consulta.paciente.nome}`,
        startDate: consulta.dataAgendada,
        endDate: moment(consulta.dataAgendada).add(30, 'm').toDate(),
        alarms: [{ relativeOffset: -5 }]
      });

      return evento ?? null;
    }

    return null;
  }
}

export default CalendarioUtils.Instancia;
