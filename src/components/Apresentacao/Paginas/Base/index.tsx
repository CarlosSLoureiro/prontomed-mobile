import { View, Text } from 'react-native';
import { PaginaBaseContrato } from './types';
import getStyles from './styles';

const PaginaBase = ({
  corDeFundo,
  icone,
  titulo
}: PaginaBaseContrato): JSX.Element => {
  const styles = getStyles(corDeFundo);

  return (
    <View style={styles.root} >
      { icone }
      <View style={styles.tituloRoot}>
        <Text style={styles.titulo}>
          {titulo}
        </Text>
      </View>
    </View>
  );
};

export default PaginaBase;
