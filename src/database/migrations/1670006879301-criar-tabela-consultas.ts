import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CriarTabelaConsultas1670006879301 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'consultas',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'paciente',
            type: 'integer'
          }
        ]
      })
    );

    await queryRunner.createForeignKey(
      'consultas',
      new TableForeignKey({
        columnNames: ['paciente'],
        referencedTableName: 'pacientes',
        referencedColumnNames: ['id']
      })
    );
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('consultas');
  }
}
