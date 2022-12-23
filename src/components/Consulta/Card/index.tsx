import { useState } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import { Card } from '@paraboly/react-native-card';

import MenuContexto from './menu';
import getStyles from './styles';

import { ConsultaCardContrato } from './types';

import moment from 'moment';

const ConsultaCard = ({
  consulta,
  ultimo = false
}: ConsultaCardContrato): JSX.Element => {
  const [exibirMenu, setExibirMenu] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });

  const styles = getStyles();

  const abrirMenu = (): void => setExibirMenu(true);
  const fecharMenu = (): void => setExibirMenu(false);

  const abrirMenuContexto = (event: { nativeEvent: any }): void => {
    const { nativeEvent } = event;
    const anchor = {
      x: nativeEvent.pageX,
      y: nativeEvent.pageY
    };

    setMenuAnchor(anchor);
    abrirMenu();
  };
  return (
    <>
        <Card
          iconDisable
          style={ultimo ? { ...styles.card, ...styles.card.ultimo } : styles.card}
          backgroundColor="#edf8ff"
          title={moment(consulta.dataAgendada).format('DD/MM/YYYY [as] HH[h]mm')}
          topRightText={`nº ${consulta.id}`}
          bottomRightComponent={<View style={styles.icon}>
            <Icon type="MaterialCommunityIcons" name="message-reply-text-outline" size={styles.icon.size} />
            <Text style={styles.icon.text}>0</Text>
          </View>}
          description={`Paciente ${consulta.paciente !== null ? consulta.paciente.nome : 'excluídor'}`}
          // @ts-expect-error - a biblioteca não inclui parametros no contrato do onPress.
          onPress={abrirMenuContexto}
        />
        <MenuContexto
            visivel={exibirMenu}
            {...{ fecharMenu, menuAnchor }}
            items={[
              {
                titulo: 'Finalizar',
                icone: 'file-check',
                callback: () => {
                  fecharMenu();
                }
              },
              {
                titulo: 'Remarcar',
                icone: 'calendar-clock',
                callback: () => {
                  fecharMenu();
                }
              },
              {
                titulo: 'Observações (2)',
                icone: 'message-reply-text',
                callback: () => {
                  fecharMenu();
                }
              },
              {
                titulo: 'Excluir',
                icone: 'file-remove',
                callback: () => {
                  fecharMenu();
                }
              }
            ]}
        />
    </>
  );
};

export default ConsultaCard;
