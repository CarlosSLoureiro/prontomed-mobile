import React from 'react';
import { View } from 'react-native';

import { RodapeContrato } from './types';
import Botao from './botao';
import getStyles from './styles';

const Rodape = ({
  corDeFundo,
  tituloBotaoEsquerdo,
  acaoBotaoEsquerdo,
  tituloBotaoDireito,
  acaoBotaoDireito
}:RodapeContrato) => {
  
  const possuiBotaoEsquerdo = tituloBotaoEsquerdo !== undefined;
  const styles = getStyles(possuiBotaoEsquerdo, corDeFundo);

  return (
    <View style={styles.rodape} >
      {possuiBotaoEsquerdo && (
        <Botao titulo={tituloBotaoEsquerdo} acao={acaoBotaoEsquerdo} />
      )}
      <Botao titulo={tituloBotaoDireito} acao={acaoBotaoDireito} />
    </View>
  );
};

export default Rodape;
