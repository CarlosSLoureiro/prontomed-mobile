import { Dimensions, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

import getStyles from './styles';

const Grafico = (): JSX.Element => {
  const styles = getStyles();

  const data = {
    labels: ['< 18', '18~30', '31~40', '41~50', '51~60', '> 60'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43]
      }
    ]
  };

  return (
    <>
      <Text style={styles.text}>Idade dos pacientes consultados no mês:</Text>
      <BarChart
          style={styles.grafico}
          data={data}
          width={Dimensions.get('window').width - 20}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          yAxisLabel=""
          yAxisSuffix=""
          verticalLabelRotation={0}
          xLabelsOffset={-10}
          yLabelsOffset={30}
          showValuesOnTopOfBars
        />
    </>
  );
};

export default Grafico;
