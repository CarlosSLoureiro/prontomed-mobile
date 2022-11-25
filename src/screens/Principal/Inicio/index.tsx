import { ScrollView, Text } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';

import getMainStyles from '../styles';

const Inicio = (): JSX.Element => {
  const styles = getMainStyles();

  return (
      <ScrollView scrollEventThrottle={400} contentContainerStyle={styles.conteudo}>
        <Icon type="Octicons" name="home" size={124} style={styles.icon} />
        <Text style={styles.text}>Início!</Text>
      </ScrollView>
  );
};

export default Inicio;
