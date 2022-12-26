import { Text, View } from 'react-native';

import getStyles from './styles';

import { MensagemContrato } from './types';

import moment from 'moment';

const Mensagem = ({
  observacao
}: MensagemContrato): JSX.Element => {
  const styles = getStyles();

  return (
      <View style={styles.mensagem}>
        <View style={styles.fundo}>
            <View style={styles.seta}></View>
            <Text style={styles.texto} >{ observacao.mensagem }</Text>
        </View>
        <Text style={styles.data}>{ moment(observacao.data).format('DD/MM/YYYY [as] HH[h]mm') }</Text>
      </View>
  );
};

export default Mensagem;
