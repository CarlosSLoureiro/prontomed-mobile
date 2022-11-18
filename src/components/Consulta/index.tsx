import React, { useState } from 'react';
import { Card, Paragraph } from 'react-native-paper';
import { agendarConsulta } from '@utils/Calendario';
import Notification from '@utils/Notification';
import { ConsultaContrato } from './types';
import getStyles from "./styles";
import MenuContexto from './menu';
import { TouchableOpacity } from 'react-native';

const Consulta = ({
    nome,
    ultimo
}:ConsultaContrato) : JSX.Element => {
    const [exibirMenu, setExibirMenu] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 })

    const styles = getStyles();
    
    const abrirMenu = () => setExibirMenu(true);
    const fecharMenu = () => setExibirMenu(false);
  
    const abrirMenuContexto = (event: { nativeEvent: any; }) => {
      const { nativeEvent } = event;
      const anchor = {
        x: nativeEvent.pageX,
        y: nativeEvent.pageY,
      };
  
      setMenuAnchor(anchor);
      abrirMenu();
    }

    return (
        <>
            <TouchableOpacity onPress={abrirMenuContexto} activeOpacity={1}>
                <Card style={ultimo ? {...styles.card, ...styles.card.ultimo}: styles.card}>
                    <Card.Title
                        leftStyle={styles.cardId}
                        left={() => <Paragraph style={styles.cardId.paragraph}>1234</Paragraph>}
                        titleNumberOfLines={0}
                        title={
                            <>
                                <Paragraph style={styles.data}>Segunda, 8 de Dezembro de 2022 às 15:00</Paragraph>
                                {"\n"}
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
                {...{nome, fecharMenu, menuAnchor}}
                items={[
                    {
                        titulo: "Agendar",
                        icone: "calendar-check",
                        callback: async () => {
                            const consulta = await agendarConsulta(nome);
                            if (consulta !== null) {
                                Notification.success({
                                    title: 'Agendado com sucesso!'
                                })
                                fecharMenu();
                            }
                        }
                    },
                    {
                        titulo: "Remarcar",
                        icone: "calendar-clock",
                        callback: () => {
                            console.log(`remarcar: ${nome}`)
                            fecharMenu();
                        }
                    },
                    {
                        titulo: "Observações (2)",
                        icone: "message-reply-text",
                        callback: () => {
                            console.log(`Observações: ${nome}`)
                            Notification.info({
                                title: `Observações de ${nome}...`
                            })
                            fecharMenu();
                        }
                    },
                    {
                        titulo: "Excluir",
                        icone: "file-remove",
                        callback: () => {
                            console.log(`Excluir: ${nome}`)
                            fecharMenu();
                        }
                    }
                ]}
            />
        </>
    )
};

export default Consulta;