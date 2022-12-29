import { useState } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import { Card } from '@paraboly/react-native-card';

import MenuContexto from '@components/MenuContexto';

import getStyles from './styles';

import { ConsultaCardContrato } from './types';

import moment from 'moment';

const ConsultaCard = ({
  reagendarFormularioRef,
  excluirFormularioRef,
  observacoesFormularioRef,
  finalizarReabrirFormularioRef,
  consulta,
  ultimo = false
}: ConsultaCardContrato): JSX.Element => {
  const [exibirMenu, setExibirMenu] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });

  const obterCorDoCard = (): string => {
    const inicioDoDia = new Date();
    inicioDoDia.setHours(0, 0, 0, 0);

    const finalDoDia = new Date();
    finalDoDia.setHours(23, 59, 59, 999);

    const atrasada = !consulta.finalizada && consulta.dataAgendada < inicioDoDia;
    const doDia = consulta.dataAgendada > inicioDoDia && consulta.dataAgendada < finalDoDia;

    if (consulta.finalizada) {
      return styles.card.backgroundColorFinalizada;
    } else if (atrasada) {
      return styles.card.backgroundColorAtrasada;
    } else if (doDia) {
      return styles.card.backgroundColorDoDia;
    } else {
      return styles.card.backgroundColorAgendada;
    }
  };
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
          backgroundColor={obterCorDoCard()}
          title={moment(consulta.dataAgendada).format('DD/MM/YYYY [as] HH[h]mm')}
          topRightText={`Nº ${consulta.id}`}
          bottomRightComponent={<View style={styles.icon}>
            <Icon type="MaterialCommunityIcons" name="message-reply-text-outline" size={styles.icon.size} />
            <Text style={styles.icon.text}>{ consulta.observacoes?.length }</Text>
          </View>}
          description={`Paciente ${consulta.paciente !== null ? consulta.paciente.nome : 'excluído'}`}
          // @ts-expect-error - a biblioteca não inclui parametros no contrato do onPress.
          onPress={abrirMenuContexto}
        />
        <MenuContexto
            visivel={exibirMenu}
            {...{ fecharMenu, menuAnchor }}
            items={[
              {
                titulo: consulta.finalizada ? 'Reabrir' : 'Finalizar',
                icone: 'file-check',
                callback: () => {
                  finalizarReabrirFormularioRef?.current.abrirDialog(consulta, !consulta.finalizada);
                  fecharMenu();
                }
              },
              {
                titulo: 'Reagendar',
                icone: 'calendar-clock',
                callback: () => {
                  reagendarFormularioRef?.current.abrirDialog(consulta);
                  fecharMenu();
                }
              },
              {
                titulo: 'Observações',
                icone: 'message-reply-text',
                callback: () => {
                  observacoesFormularioRef?.current.abrirDialog(consulta);
                  fecharMenu();
                }
              },
              {
                titulo: 'Excluir',
                icone: 'file-remove',
                callback: () => {
                  excluirFormularioRef?.current.abrirDialog(consulta);
                  fecharMenu();
                }
              }
            ]}
        />
    </>
  );
};

export default ConsultaCard;
