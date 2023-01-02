import { Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import getStyles from './styles';

import { GraficoContrato } from './types';

const GraficoA = ({
  dados
}: GraficoContrato): JSX.Element => {
  const styles = getStyles();

  return (
    <>
      <Text style={styles.text}>Status de consultas dos últimos meses:</Text>
      {
        dados && <LineChart
          style={styles.grafico}
          width={Dimensions.get('window').width}
          height={220}
          data={{
            labels: dados.totalDeConsultasPorMeses.map(dado => ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][dado.mes - 1]),
            datasets: [
              {
                data: dados.totalDeConsultasPorMeses.map(dado => dado.quantidade),
                color: () => styles.consultasCadastradas.color,
                strokeWidth: 3
              },
              {
                data: dados.totalDeConsultasFinalizadasPorMeses.map(dado => dado.quantidade),
                color: () => styles.consultasFinalizadas.color,
                strokeWidth: 3
              }
            ],
            legend: ['Cadastradas', 'Finalizadas']
          }}
          chartConfig={styles.config}
        />
      }
    </>
  );
};

export default GraficoA;
