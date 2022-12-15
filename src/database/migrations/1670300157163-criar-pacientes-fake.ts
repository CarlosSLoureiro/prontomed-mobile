import { MigrationInterface, QueryRunner } from 'typeorm';

import Paciente from '@entity/Paciente';
import PacienteFactory from '@entity/Paciente/factory';

const QUANTIDADE = 100;

export default class CriarPacientesFake1670300157163 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    for (let i = 0; i < QUANTIDADE; i++) {
      await queryRunner.manager.save(
        queryRunner.manager.create<Paciente>(Paciente, new PacienteFactory())
      );
    }
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE * FROM pacientes');
  }
}
