import Consulta from '@entity/Consulta';
import ConsultaFactory from '@entity/Consulta/factory';
import { Generos } from '@entity/Paciente/enums';
import PacienteFactory from '@entity/Paciente/factory';
import ConsultasRepositoryInterface from '@repository/Consultas/interface';
import ConsultasRepositoryMock from '@repository/Consultas/mock';

import ObservacoesUtils from '@utils/Observacoes';

import AgendarConsultasHelper from '.';

import moment from 'moment';

describe('helpers > Consultas > Agendar', () => {
  let repository: ConsultasRepositoryInterface;
  let agendarSpy: jest.SpyInstance<any>;
  let cadastrarObservacao: jest.SpyInstance<any>;
  let obterPossivelConsultaEmConflitoSpy: jest.SpyInstance<any>;
  let helper: AgendarConsultasHelper;

  beforeEach(() => {
    repository = new ConsultasRepositoryMock();
    agendarSpy = jest.spyOn(repository, 'agendar');
    cadastrarObservacao = jest.spyOn(ObservacoesUtils, 'cadastrar');
    obterPossivelConsultaEmConflitoSpy = jest.spyOn(repository, 'obterPossivelConsultaEmConflito');
    helper = new AgendarConsultasHelper(repository);
  });

  test('deve agendar consulta', async () => {
    const pacienteFactory = new PacienteFactory();
    const data = new Date();

    obterPossivelConsultaEmConflitoSpy.mockReturnValue(undefined);

    await expect(helper.executar(pacienteFactory, data)).resolves.toBeInstanceOf(Consulta);
    expect(obterPossivelConsultaEmConflitoSpy).toHaveBeenCalledTimes(1);
    expect(agendarSpy).toHaveBeenCalledWith(pacienteFactory, data);
  });

  test('deve cadastrar observação na consulta ao agendar a consulta', async () => {
    const pacienteFactory = new PacienteFactory();
    const consultaFactory = new ConsultaFactory();
    const data = new Date();

    consultaFactory.paciente = pacienteFactory;

    agendarSpy.mockReturnValue(consultaFactory);
    obterPossivelConsultaEmConflitoSpy.mockReturnValue(undefined);

    await expect(helper.executar(pacienteFactory, data)).resolves.toBeInstanceOf(Consulta);
    expect(obterPossivelConsultaEmConflitoSpy).toHaveBeenCalledTimes(1);
    expect(agendarSpy).toHaveBeenCalledWith(pacienteFactory, data);
    expect(cadastrarObservacao).toHaveBeenCalledWith('Consulta cadastrada', [consultaFactory]);
  });

  test('não deve agendar consulta caso existe consulta em conflito', async () => {
    const paciente = new PacienteFactory();
    const data = new Date();
    const consultaEmConflito = new Consulta();
    consultaEmConflito.dataAgendada = data;
    consultaEmConflito.paciente = paciente;

    obterPossivelConsultaEmConflitoSpy.mockReturnValue(consultaEmConflito);

    await expect(helper.executar(paciente, data)).rejects.toThrow(`Você já possui uma consulta agendada para o dia ${moment(data).format('DD/MM/YYYY [as] HH[h]mm')} com ${paciente.genero === Generos.FEMININO ? 'a' : 'o'} paciente ${paciente.nome}`);
    expect(obterPossivelConsultaEmConflitoSpy).toHaveBeenCalledTimes(1);
    expect(agendarSpy).toHaveBeenCalledTimes(0);
  });
});
