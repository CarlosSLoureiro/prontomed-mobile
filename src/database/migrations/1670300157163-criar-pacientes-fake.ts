import { faker } from '@faker-js/faker/locale/pt_BR';

import { MigrationInterface, QueryRunner } from 'typeorm';

import Paciente from '@entity/paciente';
import { Generos, TiposSanguineos } from '@entity/paciente/enums';

const QUANTIDADE = 100;

export default class CriarPacientesFake1670300157163 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    for (let i = 0; i < QUANTIDADE; i++) {
      await queryRunner.manager.save(
        queryRunner.manager.create<Paciente>(Paciente, {
          nome: faker.name.fullName(),
          email: faker.internet.email(),
          genero: faker.helpers.arrayElement(Object.values(Generos)),
          telefone: '999999999',
          dataNascimento: faker.date.birthdate(),
          altura: faker.datatype.number({
            min: 155,
            max: 180
          }) / 100,
          peso: faker.datatype.number({
            min: 60,
            max: 85
          }),
          tipoSanguineo: faker.helpers.arrayElement(Object.values(TiposSanguineos)),
          dataAtualizacao: new Date(),
          dataCriacao: new Date()
        })
      );
    }
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE * FROM pacientes');
  }
}
