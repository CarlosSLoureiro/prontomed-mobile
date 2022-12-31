import { Text, View } from 'react-native';
import { Badge } from 'react-native-paper';

import getCardStyles from '../Card/styles';

import getStyles from './styles';

const Legenda = (): JSX.Element => {
  const styles = getStyles();
  const cardStyles = getCardStyles();

  return (
    <View style={styles.container}>
      <View style={styles.legendas}>
        <Text style={styles.text}>Legendas:</Text>
        <Badge style={{ ...styles.badges, backgroundColor: cardStyles.card.backgroundColorAgendada }}>Agendadas</Badge>
        <Text>,</Text>
        <Badge style={{ ...styles.badges, backgroundColor: cardStyles.card.backgroundColorDoDia }}>Do dia</Badge>
        <Text>,</Text>
        <Badge style={{ ...styles.badges, backgroundColor: cardStyles.card.backgroundColorAtrasada }}>Atrasadas</Badge>
        <Text>,</Text>
        <Badge style={{ ...styles.badges, backgroundColor: cardStyles.card.backgroundColorFinalizada }}>Finalizadas</Badge>
      </View>
    </View>
  );
};

export default Legenda;
