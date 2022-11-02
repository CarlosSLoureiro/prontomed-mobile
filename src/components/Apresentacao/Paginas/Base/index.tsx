import React from 'react';
import { View, Text } from 'react-native';
import { PaginaBaseContrato } from './contratos';
import getStyles from './styles';

const PaginaBase = ({
  corDeFundo,
  icone,
  titulo
}:PaginaBaseContrato) => {
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