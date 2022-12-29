import { Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import getStyles from './styles';

const Grafico = (): JSX.Element => {
  const styles = getStyles();

  const data = {
    labels: ['Jun', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: () => styles.consultasCadastradas.color,
        strokeWidth: 3
      },
      {
        data: [10, 15, 10, 30, 77, 43],
        color: () => styles.consultasFinalizadas.color,
        strokeWidth: 3
      }
    ],
    legend: ['Cadastradas', 'Finalizadas']
  };

  return (
    <>
      <Text style={styles.text}>Status de consultas dos últimos meses:</Text>
      <LineChart
        style={styles.grafico}
        width={Dimensions.get('window').width}
        height={220}
        data={data}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '5',
            strokeWidth: '2'
            // stroke: '#ffa726'
          }
        }}
      />
    </>
  );
};

export default Grafico;
