import { faker } from '@faker-js/faker/locale/pt_BR';

import Consulta from '@entity/Consulta';
import ConsultaFactory from '@entity/Consulta/factory';

import Observacao from '.';

const obterConsultaAleatorio = (): Consulta => {
  const consultaFactory = new ConsultaFactory();
  consultaFactory.id = faker.datatype.number({ min: 1, max: 100 });

  return consultaFactory;
};

export default class ObservacaoFactory extends Observacao {
  consulta = obterConsultaAleatorio();
  mensagem = faker.helpers.arrayElement([
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
  ]);

  dataCriacao = new Date();
  dataAtualizacao = new Date();
}
