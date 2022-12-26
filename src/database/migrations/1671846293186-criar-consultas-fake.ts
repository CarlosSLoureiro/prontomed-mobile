import { MigrationInterface, QueryRunner } from 'typeorm';

import Consulta from '@entity/Consulta';
import ConsultaFactory from '@entity/Consulta/factory';
import Observacao from '@entity/Observacao';
import ObservacaoFactory from '@entity/Observacao/factory';

const QUANTIDADE = 100;

export default class CriarConsultasFake1671846293186 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    for (let i = 0; i < QUANTIDADE; i++) {
      const consulta = await queryRunner.manager.save(
        queryRunner.manager.create<Consulta>(Consulta, new ConsultaFactory())
      );

      const observacoes = Math.floor(Math.random() * 5);

      for (let i = 0; i < observacoes; i++) {
        const observacao = new ObservacaoFactory();
        observacao.consulta = consulta;

        await queryRunner.manager.save(
          queryRunner.manager.create<Observacao>(Observacao, observacao)
        );
      }
    }
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE * FROM consultas');
  }
}
