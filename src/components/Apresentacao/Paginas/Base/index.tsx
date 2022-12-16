import { Text, View } from 'react-native';

import getStyles from './styles';

import { PaginaBaseContrato } from './types';

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
