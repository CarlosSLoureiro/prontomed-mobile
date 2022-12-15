import { faker } from '@faker-js/faker/locale/pt_BR';

import { Generos, TiposSanguineos } from './enums';
import Paciente from '.';

export default class PacienteFactory extends Paciente {
  genero = faker.helpers.arrayElement(Object.values(Generos).filter(genero => genero !== Generos.OUTRO));
  nome = faker.name.fullName({ sex: this.genero === Generos.FEMININO ? 'female' : 'male' });
  email = faker.internet.email(this.nome.split(' ')[0]);
  telefone = '(21) 99999-9999';
  dataNascimento = faker.date.birthdate();
  altura = faker.datatype.number({ min: 160, max: 180 }) / 100;
  peso = faker.datatype.number({ min: 60, max: 80 });
  tipoSanguineo = faker.helpers.arrayElement(Object.values(TiposSanguineos));
  dataAtualizacao = new Date();
  dataCriacao = new Date();
}
