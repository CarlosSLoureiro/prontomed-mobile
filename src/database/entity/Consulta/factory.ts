import { faker } from '@faker-js/faker/locale/pt_BR';

import Paciente from '@entity/Paciente';
import PacienteFactory from '@entity/Paciente/factory';

import Consulta from '.';

const obterPacienteAleatorio = (): Paciente => {
  const pacienteFactory = new PacienteFactory();
  pacienteFactory.id = faker.datatype.number({ min: 1, max: 100 });

  return pacienteFactory;
};

const inicioDoDia = new Date();
inicioDoDia.setHours(0, 0, 0, 0);

export default class ConsultaFactory extends Consulta {
  dataAgendada = faker.date.between(faker.date.recent(13), faker.date.soon(3));
  paciente = obterPacienteAleatorio();
  finalizada = this.dataAgendada < inicioDoDia ? faker.datatype.number({ min: 1, max: 5 }) !== 5 : false;
  dataAtualizacao = new Date();
  dataCriacao = new Date();
}
