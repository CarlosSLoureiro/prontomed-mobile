import React, { useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Icon from "react-native-dynamic-vector-icons";
import getMainStyles from "../styles";
import { ConsultaContrato } from '@components/Consulta/types';
import { ConsultasContrato } from './types';
import Consulta from '@components/Consulta';
import items from './items';
import Notification from '@utils/Notification';
import { NotifierComponents } from 'react-native-notifier';
import { Portal, FAB, Dialog, RadioButton, Button, ToggleButton, Divider } from 'react-native-paper';
import ToggleButtonGroup from 'react-native-paper/lib/typescript/components/ToggleButton/ToggleButtonGroup';

/* @ts-ignore */
const deveCarregarMais = ({layoutMeasurement, contentOffset, contentSize}) => {
  return layoutMeasurement.height + contentOffset.y >= contentSize.height;
};

const Consultas = ({
  paginaAtiva
}:ConsultasContrato): JSX.Element => {
    const styles = getMainStyles();
    const [consultas, setConsultas] = useState<Array<ConsultaContrato>>(items);
    const [opcoesVisiveis, setOpcoesVisiveis] = useState(false);
    const scrollRef = useRef<ScrollView>(null);

    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState('id');
    const [selectedValue, setSelectedValue] = useState('crescente');
    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

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
    
    if (!paginaAtiva) {
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
        <Portal>
          <FAB.Group
            open={opcoesVisiveis}
            visible={paginaAtiva}
            style={{
              paddingBottom: 100,
              marginRight: -10,
            }}
            fabStyle={{
              backgroundColor: "#fff",
            }}
            icon={opcoesVisiveis ? 'calendar-account-outline' : 'plus'}
            actions={[
              {
                icon: 'magnify',
                label: 'Buscar',
                onPress: () => console.log('Buscar formulário de Consulta'),
              },
              {
                icon: 'order-alphabetical-ascending',
                label: 'Ordenar',
                onPress: showDialog,
              }
            ]}
            onStateChange={({ open }) => setOpcoesVisiveis(open)}
          />


          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Como deseja ordernar?</Dialog.Title>
            <Dialog.Content>
             <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                <RadioButton.Item label="Pelo número da consulta" value="id" />
                <RadioButton.Item label="Pelo nome do paciente" value="nome" />
                <RadioButton.Item label="Pela data de agendamento" value="data" />
             </RadioButton.Group>
            <Divider/>
             <RadioButton.Group onValueChange={value => setSelectedValue(value)} value={selectedValue}>
              <View>
                <RadioButton.Item label="Em ordem crescente (A-Z)" value="crescente" />
              </View>
              <View>
                <RadioButton.Item label="Em ordem decrescente (Z-A)" value="decrescente" />
              </View>
             </RadioButton.Group>
            </Dialog.Content>
            <Dialog.Actions>
              <Button color='#000000' onPress={hideDialog}>Ordenar</Button>
              <Button color='#000000' onPress={hideDialog}>Cancelar</Button>
            </Dialog.Actions>
          </Dialog>


        </Portal>
        <Icon type="FontAwesome" name="calendar-check-o" size={124} style={styles.icon} />
        <Text style={styles.text}>Suas consultas!</Text>
        {
          consultas.map((consulta, index) => <Consulta key={index} {...consulta} ultimo={consultas.length - 1 === index} />)
        }
      </ScrollView>
    )
};

export default Consultas;