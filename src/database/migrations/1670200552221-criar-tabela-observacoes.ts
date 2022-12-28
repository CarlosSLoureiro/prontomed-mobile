import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CriarTabelaObservacoes1670200552221 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'observacoes',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'consulta',
            type: 'integer'
          },
          {
            name: 'mensagem',
            type: 'text'
          },
          {
            name: 'dataCriacao',
            type: 'datetime'
          },
          {
            name: 'dataAtualizacao',
            type: 'datetime'
          }
        ]
      })
    );

    await queryRunner.createForeignKey(
      'observacoes',
      new TableForeignKey({
        columnNames: ['consulta'],
        referencedTableName: 'consultas',
        referencedColumnNames: ['id'],
        onUpdate: 'Cascade',
        onDelete: 'Cascade'
      })
    );
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('observacoes');
  }
}
