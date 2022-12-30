import { faker } from '@faker-js/faker/locale/pt_BR';

import { MigrationInterface, QueryRunner } from 'typeorm';

import Consulta from '@entity/Consulta';
import ConsultaFactory from '@entity/Consulta/factory';
import Observacao from '@entity/Observacao';
import ObservacaoFactory from '@entity/Observacao/factory';

const QUANTIDADE = 100;

export default class CriarConsultasFake1671846293186 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await this.criaConsultasDoMesesAnteriores(queryRunner);
    await this.criaConsultasDoMesAtual(queryRunner);
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE * FROM consultas');
  }

  private async criaConsultasDoMesAtual (queryRunner: QueryRunner): Promise<void> {
    for (let i = 0; i < QUANTIDADE; i++) {
      const consulta = await queryRunner.manager.save(
        queryRunner.manager.create<Consulta>(Consulta, new ConsultaFactory())
      );

      const observacaoInicial = new ObservacaoFactory();
      observacaoInicial.consulta = consulta;
      observacaoInicial.mensagem = 'Consulta cadastrada';

      await queryRunner.manager.save(
        queryRunner.manager.create<Observacao>(Observacao, observacaoInicial)
      );

      const observacoes = Math.floor(Math.random() * 5);

      for (let i = 0; i < observacoes; i++) {
        const observacao = new ObservacaoFactory();
        observacao.consulta = consulta;

        await queryRunner.manager.save(
          queryRunner.manager.create<Observacao>(Observacao, observacao)
        );
      }

      if (consulta.finalizada) {
        const observacaoFinal = new ObservacaoFactory();
        observacaoFinal.consulta = consulta;
        observacaoFinal.mensagem = 'Consulta finalizada';

        await queryRunner.manager.save(
          queryRunner.manager.create<Observacao>(Observacao, observacaoFinal)
        );
      }
    }
  }

  private async criaConsultasDoMesesAnteriores (queryRunner: QueryRunner): Promise<void> {
    const mesesAtras = 4;
    for (let mesAtras = 0; mesAtras < mesesAtras; mesAtras++) {
      for (let i = 0; i < QUANTIDADE / (mesAtras + 2); i++) {
        const hoje = new Date();
        const mesAnterior = hoje.getMonth() - mesAtras;
        const proxMesAoAnterior = mesAnterior + 1;
        const dataInicio = `${hoje.getFullYear()}-${(`0${mesAnterior}`).slice(-2)}-01`;
        const dataFim = `${hoje.getFullYear()}-${(`0${proxMesAoAnterior}`).slice(-2)}-01`;

        const dataConsulta = faker.date.between(dataInicio, dataFim);

        const dados = new ConsultaFactory();
        dados.dataAgendada = dados.dataCriacao = dados.dataAtualizacao = dataConsulta;

        const consulta = await queryRunner.manager.save(
          queryRunner.manager.create<Consulta>(Consulta, dados)
        );

        const observacaoInicial = new ObservacaoFactory();
        observacaoInicial.consulta = consulta;
        observacaoInicial.mensagem = 'Consulta cadastrada';
        observacaoInicial.dataCriacao = observacaoInicial.dataAtualizacao = consulta.dataAgendada;

        await queryRunner.manager.save(
          queryRunner.manager.create<Observacao>(Observacao, observacaoInicial)
        );

        const observacoes = Math.floor(Math.random() * 5);

        for (let i = 0; i < observacoes; i++) {
          const observacao = new ObservacaoFactory();
          observacao.consulta = consulta;
          observacao.dataCriacao = observacao.dataAtualizacao = consulta.dataAgendada;

          await queryRunner.manager.save(
            queryRunner.manager.create<Observacao>(Observacao, observacao)
          );
        }

        if (consulta.finalizada) {
          const observacaoFinal = new ObservacaoFactory();
          observacaoFinal.consulta = consulta;
          observacaoFinal.mensagem = 'Consulta finalizada';
          observacaoFinal.dataCriacao = observacaoFinal.dataAtualizacao = consulta.dataAgendada;

          await queryRunner.manager.save(
            queryRunner.manager.create<Observacao>(Observacao, observacaoFinal)
          );
        }
      }
    }
  }
}
