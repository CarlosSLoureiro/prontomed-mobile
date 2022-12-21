import { useEffect, useState } from 'react';
import { Switch, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import getStyles from './styles';

import { ItemContrato } from './types';

const Item = ({
  nome,
  variavel
}: ItemContrato): JSX.Element => {
  const styles = getStyles();

  const [valor, setValor] = useState(false);

  useEffect(() => {
    void (async () => {
      const valorSalvo = await AsyncStorage.getItem(`ProntoMed:${variavel}`);
      setValor(valorSalvo === 'true');
    })();
  }, [variavel]);

  const alterarValor = (): void => {
    void (async () => {
      const novoValor = !valor;
      console.log(`salvar valor ${variavel}=${novoValor.toString()}`);
      await AsyncStorage.setItem(`ProntoMed:${variavel}`, novoValor.toString());
      setValor(novoValor);
    })();
  };

  return (
    <View style={styles.item}>
        <Text style={styles.text}>{ nome }</Text>
        <Switch style={styles.botao} value={valor} onValueChange={alterarValor} />
    </View>
  );
};

export default Item;
