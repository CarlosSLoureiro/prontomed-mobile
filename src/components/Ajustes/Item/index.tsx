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
      if (valorSalvo !== null) {
        setValor(valorSalvo === 'true');
      } else {
        await AsyncStorage.setItem(`ProntoMed:${variavel}`, (true).toString());
        setValor(true);
      }
    })();
  }, [variavel]);

  const alterarValor = (): void => {
    void (async () => {
      const novoValor = !valor;
      await AsyncStorage.setItem(`ProntoMed:${variavel}`, novoValor.toString());
      setValor(novoValor);
    })();
  };

  return (
    <View style={styles.item}>
        <Text style={styles.text}>{ nome }</Text>
        <Switch
          style={styles.botao}
          thumbColor={styles.botao.thumbColor}
          trackColor={{
            true: styles.botao.activeColor,
            false: styles.botao.unactiveColor
          }}
          value={valor}
          onValueChange={alterarValor}
        />
    </View>
  );
};

export default Item;
