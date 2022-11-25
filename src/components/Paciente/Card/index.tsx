import { Avatar, Card, IconButton } from 'react-native-paper';

import getStyles from './styles';
import { PacienteCardContrato } from './types';

const PacienteCard = ({
  ultimo
}: PacienteCardContrato): JSX.Element => {
  const styles = getStyles();

  return (
        <Card style={ultimo ? { ...styles.card, ...styles.cardUltimo } : styles.card}>
            <Card.Title
                title="Carlos Loureiro"
                subtitle="Masculino, 23 anos, 75Kg, 1.3M"
                left={(props) => <Avatar.Icon {...props} icon="calendar-account-outline" style={styles.icone}/>}
                right={(props) => <IconButton {...props} icon="menu" onPress={() => console.log('Abrir context menu')}/>}
            />
        </Card>
  );
};

export default PacienteCard;
