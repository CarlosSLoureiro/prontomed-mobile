import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';

import Notification from '@hooks/useNotification';

import MenuContexto from './menu';
import getStyles from './styles';

import { ConsultaCardContrato } from './types';

const ConsultaCard = ({
  nome,
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
            <TouchableOpacity onPress={abrirMenuContexto}>
                <Card style={ultimo ? { ...styles.card, ...styles.card.ultimo } : styles.card}>
                    <Card.Title
                        leftStyle={styles.cardId}
                        left={() => <Paragraph style={styles.cardId.paragraph}>1234</Paragraph>}
                        titleNumberOfLines={0}
                        title={
                            <>
                                <Paragraph style={styles.data}>Segunda, 8 de Dezembro de 2022 às 15:00</Paragraph>
                                {'\n'}
                                <Paragraph style={styles.nome}>{nome}</Paragraph>
                            </>
                        }
                        subtitleStyle={styles.subtitle}
                        subtitle="Masculino, 23 anos, 75Kg, 1.3M"
                    />
                </Card>
            </TouchableOpacity>
            <MenuContexto
                visivel={exibirMenu}
                {...{ nome, fecharMenu, menuAnchor }}
                items={[
                  {
                    titulo: 'Remarcar',
                    icone: 'calendar-clock',
                    callback: () => {
                      console.log(`remarcar: ${nome}`);
                      fecharMenu();
                    }
                  },
                  {
                    titulo: 'Observações (2)',
                    icone: 'message-reply-text',
                    callback: () => {
                      console.log(`Observações: ${nome}`);
                      Notification.info({
                        title: `Observações de ${nome}...`
                      });
                      fecharMenu();
                    }
                  },
                  {
                    titulo: 'Excluir',
                    icone: 'file-remove',
                    callback: () => {
                      console.log(`Excluir: ${nome}`);
                      fecharMenu();
                    }
                  }
                ]}
            />
        </>
  );
};

export default ConsultaCard;
