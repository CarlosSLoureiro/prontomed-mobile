import { View } from 'react-native';

import Botao from './botao';
import getStyles from './styles';

import { RodapeContrato } from './types';

const Rodape = ({
  corDeFundo,
  tituloBotaoEsquerdo,
  acaoBotaoEsquerdo,
  tituloBotaoDireito,
  acaoBotaoDireito
}: RodapeContrato): JSX.Element => {
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
