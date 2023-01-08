import { faker } from '@faker-js/faker/locale/pt_BR';

import { MigrationInterface, QueryRunner } from 'typeorm';

import Consulta from '@entity/Consulta';
import ConsultaFactory from '@entity/Consulta/factory';
import Observacao from '@entity/Observacao';
import ObservacaoFactory from '@entity/Observacao/factory';

const QUANTIDADE = 100;

export default class CriarConsultasFake1671846293186 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    global.deveRecarregarGraficos = true;
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
      const hoje = new Date();

      let mesAnterior = (hoje.getMonth() - mesAtras);

      const anoInicio = mesAnterior < 1 ? hoje.getFullYear() - 1 : hoje.getFullYear();

      if (mesAnterior < 1) {
        mesAnterior += 12;
      }

      let proxMesAoAnterior = mesAnterior + 1;

      const anoFim = proxMesAoAnterior > 12 ? anoInicio + 1 : anoInicio;

      if (proxMesAoAnterior > 12) {
        proxMesAoAnterior -= 12;
      }

      const dataInicio = `${anoInicio}-${(`0${mesAnterior}`).slice(-2)}-01`;
      const dataFim = `${anoFim}-${(`0${proxMesAoAnterior}`).slice(-2)}-01`;

      console.log('dataInicio', dataInicio);
      console.log('dataFim', dataFim);
      console.log('');

      for (let i = 0; i < QUANTIDADE / (mesAtras + 2); i++) {
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
