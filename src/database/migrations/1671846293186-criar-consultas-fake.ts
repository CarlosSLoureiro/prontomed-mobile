import { MigrationInterface, QueryRunner } from 'typeorm';

import Consulta from '@entity/Consulta';
import ConsultaFactory from '@entity/Consulta/factory';

const QUANTIDADE = 100;

export default class CriarConsultasFake1671846293186 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    for (let i = 0; i < QUANTIDADE; i++) {
      await queryRunner.manager.save(
        queryRunner.manager.create<Consulta>(Consulta, new ConsultaFactory())
      );
    }
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE * FROM consultas');
  }
}
