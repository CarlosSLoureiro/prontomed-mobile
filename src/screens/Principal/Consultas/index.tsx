import React, { useRef, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import Icon from "react-native-dynamic-vector-icons";
import getMainStyles from "../styles";
import { ConsultaContrato } from '@components/Consulta/types';
import { ConsultasContrato } from './types';
import Consulta from '@components/Consulta';
import items from './items';
import Notification from '@utils/Notification';
import { NotifierComponents } from 'react-native-notifier';

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

    const carregarConsultas = async () => {
      console.log('deve carregar >>>');
      if (consultas.length < 15) {
        Promise.resolve(
          setConsultas([...consultas, ...[{
            nome: `carlos loureiro #${consultas.length}`
          },
          {
            nome: `jessie #${consultas.length}`
          }]])
        );
      } else {
        Notification.add({
          title: 'Não há mais consultas',
          description: 'Tente alterar os filtros de busca',
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'error',
          },
          duration: 5000,
        });
      }
    }
    
    if (deveResetar) {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    }

    return (
      <ScrollView scrollEventThrottle={400}
        onScroll={async ({nativeEvent}) => {
          if(deveCarregarMais(nativeEvent)){
            await carregarConsultas();
          }
        }}
        ref={scrollRef}
        contentContainerStyle={styles.conteudo}
      >
        <Icon type="FontAwesome" name="calendar-check-o" size={124} style={styles.icon} />
        <Text style={styles.text}>Suas consultas!</Text>
        {
          consultas.map((consulta, index) => <Consulta key={index} {...consulta} ultimo={consultas.length - 1 === index} />)
        }
      </ScrollView>
    )
};

export default Consultas;