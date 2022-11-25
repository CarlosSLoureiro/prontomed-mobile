import { Text, TouchableOpacity } from 'react-native';
import { BotaoContrato } from './types';

const Botao = ({
  titulo,
  acao
}: BotaoContrato): JSX.Element => {
  return (
    <TouchableOpacity
      style={{ alignItems: 'center', justifyContent: 'center' }}
      onPress={acao}
    >
      <Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
        {titulo}
      </Text>
    </TouchableOpacity>
  );
};

export default Botao;
