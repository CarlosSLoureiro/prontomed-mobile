import { Repositories } from '@database';
import ConsultasRepositoryInterface from '@repository/Consultas/interface';
import { StatusConsultas, ValoresStatusConsultas } from '@repository/Consultas/types';

export default class ObterStatusConsultasHelper {
  private readonly repository: ConsultasRepositoryInterface;

  constructor (repository: ConsultasRepositoryInterface = (global.repositories as Repositories).consultasRepository) {
    this.repository = repository;
  }

  private preencheResultados (mesesTotais: Array<ValoresStatusConsultas>, meses: number): void {
    // Preenche os meses restantes caso não haja o resultado de meses esperados
    const mesAtual = (new Date()).getMonth() + 1;

    if (mesesTotais.length < meses) {
      const ultimoMes = mesesTotais.length > 0 ? mesesTotais[mesesTotais.length - 1].mes : mesAtual;

      for (let i = mesesTotais.length; i < meses; i++) {
        let mes = ultimoMes - i;

        if (mes < 1) {
          mes += 12;
        }

        mesesTotais.unshift({ mes, quantidade: 0 });
      }
    }

    const ultimoMes = mesesTotais[mesesTotais.length - 1].mes;

    if (ultimoMes !== mesAtual) {
      mesesTotais.push({ mes: mesAtual, quantidade: 0 });
    }
  }

  public async executar (): Promise<StatusConsultas> {
    const meses = 6;

    const mesesTotais = await this.repository.obterStatus(meses);

    this.preencheResultados(mesesTotais.totalDeConsultasPorMeses, meses);
    this.preencheResultados(mesesTotais.totalDeConsultasFinalizadasPorMeses, meses);

    return mesesTotais;
  }
}
