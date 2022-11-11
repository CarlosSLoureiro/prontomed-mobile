import React from 'react';
import { ScrollView, Text } from 'react-native';
import Icon from "react-native-dynamic-vector-icons";
import getMainStyles from "../styles";
import Consulta from '@components/Consulta';

/* @ts-ignore */
const deveCarregarMais = ({layoutMeasurement, contentOffset, contentSize}) => {
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
};

const carregarConsultas = () => {
  console.log('Carregar mais consultas');
}

const Consultas = (): JSX.Element => {
    const styles = getMainStyles();
  
    return (
      <ScrollView scrollEventThrottle={400}
        onScroll={({nativeEvent}) => {
          if(deveCarregarMais(nativeEvent)){
            carregarConsultas();
          }
        }}
        contentContainerStyle={styles.conteudo}
      >
        <Icon type="FontAwesome" name="calendar-check-o" size={124} style={styles.icon} />
        <Text style={styles.text}>Suas consultas!</Text>
        <Consulta />
        <Consulta />
        <Consulta />
        <Consulta />
        <Consulta />
        <Consulta />
        <Consulta />
        <Consulta />
        <Consulta />
        <Consulta />
        <Consulta />
        <Consulta />
        <Consulta />
        <Consulta ultimo={true} />
      </ScrollView>
    )
};

export default Consultas;