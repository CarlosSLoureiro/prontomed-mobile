import React, { useRef, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import Icon from "react-native-dynamic-vector-icons";
import getMainStyles from "../styles";
import { ConsultaContrato } from '@components/Consulta/contratos';
import { ConsultasContrato } from './contratos';
import Consulta from '@components/Consulta';
import items from './items';

/* @ts-ignore */
const deveCarregarMais = ({layoutMeasurement, contentOffset, contentSize}) => {
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;
};

const Consultas = ({
  deveResetar
}:ConsultasContrato): JSX.Element => {
    const styles = getMainStyles();
    const [consultas, setConsultas] = useState<Array<ConsultaContrato>>(items);
    const scrollRef = useRef<ScrollView>(null);

    const carregarConsultas = () => {
      console.log('deve carregar >>>');
      setConsultas([...consultas, ...[{
        nome: `carlos loureiro #${consultas.length}`
      }]]);
    }
    
    if (deveResetar) {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    }

    return (
      <ScrollView scrollEventThrottle={400}
        onScroll={({nativeEvent}) => {
          if(deveCarregarMais(nativeEvent)){
            carregarConsultas();
          }
        }}
        ref={scrollRef}
        contentContainerStyle={styles.conteudo}
      >
        <Icon type="FontAwesome" name="calendar-check-o" size={124} style={styles.icon} />
        <Text style={styles.text}>Suas consultas!</Text>
        {
          consultas.map((consulta, index) => <Consulta key={index} {...consulta} />)
        }
      </ScrollView>
    )
};

export default Consultas;