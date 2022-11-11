import React from 'react';
import { Avatar, Card, IconButton, Paragraph } from 'react-native-paper';
import { CardContrato } from './contratos';
import getStyles from "./styles";
  
const Paciente = ({
    ultimo
}:CardContrato) : JSX.Element => {
    const styles = getStyles();

    return (
        <Card style={ultimo ? {...styles.card, ...styles.cardUltimo}: styles.card}>
            <Card.Title
                title="Carlos Loureiro"
                subtitle="Masculino, 23 anos, 75Kg, 1.3M"
                left={(props) => <Avatar.Icon {...props} icon="calendar-account-outline" style={styles.icone}/>}
                right={(props) => <IconButton {...props} icon="menu" onPress={() => console.log('Abrir context menu')}/>}
            />
        </Card>
    )
};

export default Paciente;