import AsyncStorage from '@react-native-async-storage/async-storage';

import { Repositories } from '@database';
import Consulta from '@entity/Consulta';
import Paciente from '@entity/Paciente';
import { Generos } from '@entity/Paciente/enums';
import ConsultasRepositoryInterface from '@repository/Consultas/interface';

import CadastrarObservacaoHelper from '@helpers/Observacoes/Cadastrar';

import Calendario from '@hooks/useCalendario';

import { Ajustes } from '@screens/Principal/Ajustes/enums';

import moment from 'moment';

export default class AgendarConsultasHelper {
  private readonly repository: ConsultasRepositoryInterface;

  constructor (repository: ConsultasRepositoryInterface = (global.repositories as Repositories).consultasRepository) {
    this.repository = repository;
  }

  private async agendarNoCalendarioExterno (consulta: Consulta): Promise<void> {
    const podeAgendar = await AsyncStorage.getItem(`ProntoMed:${Ajustes.CALENDARIO}`) === 'true';
    if (podeAgendar) {
      const evento = await Calendario.agendarConsulta({
        title: `Consulta com ${consulta.paciente.nome}`,
        startDate: consulta.dataAgendada,
        endDate: moment(consulta.dataAgendada).add(30, 'm').toDate(),
        alarms: [{ relativeOffset: -5 }]
      });

      if (evento !== undefined) {
        await this.repository.editar({
          ...consulta,
          evento
        });
      }
    }
  }

  private async cadastrarObservacao (consulta: Consulta): Promise<void> {
    try {
      const helper = new CadastrarObservacaoHelper();
      const observacao = await helper.executar(consulta, {
        mensagem: 'Consulta cadastrada'
      });
      consulta?.observacoes?.push(observacao);
    } catch (e) {
    }
  }

  public async executar (paciente: Paciente, data: Date): Promise<Consulta> {
    const possivelConsultaEmConflito = await this.repository.obterPossivelConsultaEmConflito(data);

    if (possivelConsultaEmConflito !== undefined) {
      throw new Error(`Você já possui uma consulta agendada para o dia ${moment(possivelConsultaEmConflito.dataAgendada).format('DD/MM/YYYY [as] HH[h]mm')} com ${possivelConsultaEmConflito.paciente.genero === Generos.FEMININO ? 'a' : 'o'} paciente ${possivelConsultaEmConflito.paciente.nome}`);
    }

    const consulta = await this.repository.agendar(paciente, data);

    await this.agendarNoCalendarioExterno(consulta);
    await this.cadastrarObservacao(consulta);

    return consulta;
  }
}
