import { Dimensions, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

import getStyles from './styles';

import { GraficoContrato } from './types';

const Grafico = ({
  dados
}: GraficoContrato): JSX.Element => {
  const styles = getStyles();

  return (
    <>
      <Text style={styles.text}>Idade dos consultados desde o último mês:</Text>
       {
          dados && <BarChart
            style={styles.grafico}
            data={{
              labels: ['< 18', '18~30', '31~40', '41~50', '51~60', '> 60'],
              datasets: [
                {
                  data: [
                    dados.filter(dado => (dado.idade < 18)).length,
                    dados.filter(dado => (dado.idade >= 18 && dado.idade <= 30)).length,
                    dados.filter(dado => (dado.idade >= 31 && dado.idade <= 40)).length,
                    dados.filter(dado => (dado.idade >= 41 && dado.idade <= 50)).length,
                    dados.filter(dado => (dado.idade >= 51 && dado.idade <= 60)).length,
                    dados.filter(dado => (dado.idade > 60)).length
                  ]
                }
              ]
            }}
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
        }
    </>
  );
};

export default Grafico;
