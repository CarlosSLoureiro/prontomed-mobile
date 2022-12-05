import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CriarTabelaPacientes1670006871124 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pacientes',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'nome',
            type: 'varchar'
          },
          {
            name: 'email',
            type: 'varchar'
          },
          {
            name: 'telefone',
            type: 'varchar'
          },
          {
            name: 'genero',
            type: 'varchar'
          },
          {
            name: 'dataNascimento',
            type: 'date'
          },
          {
            name: 'peso',
            type: 'numeric'
          },
          {
            name: 'altura',
            type: 'numeric'
          },
          {
            name: 'tipoSanguineo',
            type: 'varchar'
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
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pacientes');
  }
}
