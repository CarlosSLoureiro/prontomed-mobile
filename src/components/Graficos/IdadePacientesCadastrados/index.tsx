import { Dimensions, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

import getStyles from './styles';

const Grafico = (): JSX.Element => {
  const styles = getStyles();

  const data = [
    {
      name: '→ < 18',
      pacientes: 20,
      color: 'rgba(0, 126, 23, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: '→ 18 ~ 30',
      pacientes: 30,
      color: '#1e00ff',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: '→ 31 ~ 40',
      pacientes: 50,
      color: '#950000',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: '→ 41 ~ 50',
      pacientes: 30,
      color: '#ff0000',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: '→ 51 ~ 60',
      pacientes: 60,
      color: '#00ffd0',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: '→ 61 ~ 70',
      pacientes: 30,
      color: '#9400f0',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: '→ > 70',
      pacientes: 20,
      color: '#f000ec',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    }
  ];

  return (
    <>
      <Text style={styles.text}>Idade geral dos pacientes cadastrados:</Text>
      <PieChart
        data={data}
        width={Dimensions.get('window').width - 20}
        style={styles.grafico}
        height={180}
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
            r: '10',
            strokeWidth: '2'
            // stroke: '#ffa726'
          }
        }}
        accessor={'pacientes'}
        backgroundColor={'#ffffff'}
        paddingLeft={'0'}
        center={[0, 10]}
        absolute
      />
    </>
  );
};

export default Grafico;
