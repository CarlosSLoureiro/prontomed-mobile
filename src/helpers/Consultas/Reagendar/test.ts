import Consulta from '@entity/Consulta';
import ConsultaFactory from '@entity/Consulta/factory';
import { Generos } from '@entity/Paciente/enums';
import PacienteFactory from '@entity/Paciente/factory';
import ConsultasRepositoryInterface from '@repository/Consultas/interface';
import ConsultasRepositoryMock from '@repository/Consultas/mock';

import ObservacoesUtils from '@utils/Observacoes';

import ReagendarConsultasHelper from '.';

import moment from 'moment';

describe('helpers > Consultas > Reagendar', () => {
  let repository: ConsultasRepositoryInterface;
  let editarSpy: jest.SpyInstance<any>;
  let cadastrarObservacao: jest.SpyInstance<any>;
  let obterPossivelConsultaEmConflitoSpy: jest.SpyInstance<any>;
  let helper: ReagendarConsultasHelper;

  beforeEach(() => {
    repository = new ConsultasRepositoryMock();
    editarSpy = jest.spyOn(repository, 'editar');
    cadastrarObservacao = jest.spyOn(ObservacoesUtils, 'cadastrar');
    obterPossivelConsultaEmConflitoSpy = jest.spyOn(repository, 'obterPossivelConsultaEmConflito');
    helper = new ReagendarConsultasHelper(repository);
  });

  test('deve reagendar consulta', async () => {
    const consultaFactory = new ConsultaFactory();

    obterPossivelConsultaEmConflitoSpy.mockReturnValue(undefined);

    await expect(helper.executar(consultaFactory)).resolves.toBeInstanceOf(Consulta);
    expect(obterPossivelConsultaEmConflitoSpy).toHaveBeenCalledTimes(1);
    expect(editarSpy).toHaveBeenCalledWith(consultaFactory);
  });

  test('deve cadastrar observação na consulta reagendada', async () => {
    const pacienteFactory = new PacienteFactory();
    const consultaFactory = new ConsultaFactory();

    consultaFactory.paciente = pacienteFactory;

    editarSpy.mockReturnValue(consultaFactory);
    obterPossivelConsultaEmConflitoSpy.mockReturnValue(undefined);

    await expect(helper.executar(consultaFactory)).resolves.toBeInstanceOf(Consulta);
    expect(obterPossivelConsultaEmConflitoSpy).toHaveBeenCalledTimes(1);
    expect(editarSpy).toHaveBeenCalledWith(consultaFactory);
    expect(cadastrarObservacao).toHaveBeenCalledWith(
      `Consulta reagendada para ${moment(consultaFactory.dataAgendada).format('DD/MM/YYYY [as] HH[h]mm')}`,
      [consultaFactory]
    );
  });

  test('não deve reagendar consulta caso existe consulta em conflito', async () => {
    const consultaFactory = new ConsultaFactory();
    const paciente = new PacienteFactory();
    const data = new Date();
    const consultaEmConflito = new Consulta();
    consultaEmConflito.dataAgendada = data;
    consultaEmConflito.paciente = paciente;

    obterPossivelConsultaEmConflitoSpy.mockReturnValue(consultaEmConflito);

    await expect(helper.executar(consultaFactory)).rejects.toThrow(`Você já possui uma consulta agendada para o dia ${moment(data).format('DD/MM/YYYY [as] HH[h]mm')} com ${paciente.genero === Generos.FEMININO ? 'a' : 'o'} paciente ${paciente.nome}`);
    expect(obterPossivelConsultaEmConflitoSpy).toHaveBeenCalledTimes(1);
    expect(editarSpy).toHaveBeenCalledTimes(0);
  });
});
