import React from 'react';
import { Avatar, Card, IconButton, Paragraph } from 'react-native-paper';
import { ConsultaContrato } from './contratos';
import getStyles from "./styles";
  
const Consulta = ({
    nome,
    ultimo
}:ConsultaContrato) : JSX.Element => {
    const styles = getStyles();

    return (
        <Card style={ultimo ? {...styles.card, ...styles.cardUltimo}: styles.card}>
            <Card.Content>
                <Paragraph style={styles.data}>Terça, 8 de Novembro de 2022 às 15:00</Paragraph>
            </Card.Content>
            <Card.Title
                title={nome}
                subtitle="Masculino, 23 anos, 75Kg, 1.3M"
                left={(props) => <Avatar.Icon {...props} icon="calendar-account-outline" style={styles.icone}/>}
                right={(props) => <IconButton {...props} icon="menu" onPress={() => console.log('Abrir context menu')}/>}
            />
        </Card>
    )
};

export default Consulta;