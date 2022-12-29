import AsyncStorage from '@react-native-async-storage/async-storage';

import Consulta from '@entity/Consulta';

import Calendario from '@hooks/useCalendario';

import { Ajustes } from '@screens/Principal/Ajustes/enums';

import CalendarioUtilsInterface from './interface';

import moment from 'moment';

class CalendarioUtils implements CalendarioUtilsInterface {
  private static _instancia: CalendarioUtils;

  public static get Instancia (): CalendarioUtils {
    return this._instancia || (this._instancia = new this());
  }

  private async temPermissao (): Promise<boolean> {
    return await AsyncStorage.getItem(`ProntoMed:${Ajustes.CALENDARIO}`) === 'true';
  }

  public async removerConsulta (consulta: Consulta, forcado = false): Promise<string | null> {
    const permissao = await this.temPermissao();
    const agora = new Date();
    const podeRemover = (consulta.dataAgendada > agora || forcado);
    if (permissao && podeRemover && consulta.evento !== null) {
      await Calendario.removerConsulta({
        id: consulta.evento
      });
      return null;
    }

    return consulta.evento;
  }

  public async agendarConsulta (consulta: Consulta): Promise<string | undefined> {
    const permissao = await this.temPermissao();
    const agora = new Date();
    const podeAgendar = (consulta.dataAgendada > agora);
    if (permissao && podeAgendar) {
      const evento = await Calendario.agendarConsulta({
        title: `Consulta com ${consulta.paciente.nome}`,
        startDate: consulta.dataAgendada,
        endDate: moment(consulta.dataAgendada).add(30, 'm').toDate(),
        alarms: [{ relativeOffset: -5 }]
      });

      return evento;
    }
  }
}

export default CalendarioUtils.Instancia;
