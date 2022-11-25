import { ScrollView, Text } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import getMainStyles from '../styles';

const Ajustes = (): JSX.Element => {
  const styles = getMainStyles();

  return (
      <ScrollView scrollEventThrottle={400} contentContainerStyle={styles.conteudo}>
        <Icon type="SimpleLineIcons" name="settings" size={124} style={styles.icon} />
        <Text style={styles.text}>Ajustes!</Text>
      </ScrollView>
  );
};

export default Ajustes;
