import { useState } from 'react';
import { Button, Dialog, Divider, RadioButton } from 'react-native-paper';

import { OrdenacaoContrato } from '@screens/Principal/Pacientes/types';

import getStyles from './styles';

import { OrdenarContrato } from './types';

const Ordenar = ({
  visivel,
  setVisivel,
  callback,
  valorAtual,
  valoresDeBusca
}: OrdenarContrato): JSX.Element => {
  const [ordem, setOrdem] = useState(valorAtual.ordem);
  const [chave, setChave] = useState(valorAtual.chave);

  const styles = getStyles();

  const cancelar = (): void => {
    setVisivel(false);
    setOrdem(valorAtual.ordem);
    setChave(valorAtual.chave);
  };

  const ordenar = (): void => {
    setVisivel(false);
    const ordenacao: OrdenacaoContrato = {
      ordem,
      chave
    };
    callback(ordenacao);
  };

  return (
      <Dialog style={styles.dialog} visible={visivel} onDismiss={cancelar}>
        <Dialog.Title style={styles.dialog.title}>Como deseja ordernar?</Dialog.Title>
        <Dialog.Content>
          <RadioButton.Group onValueChange={valor => setOrdem(valor)} value={ordem}>
            <RadioButton.Item labelStyle={styles.dialog.labels} color={styles.dialog.labels.checked} label="Em ordem crescente (A-Z)" value="crescente" />
            <RadioButton.Item labelStyle={styles.dialog.labels} color={styles.dialog.labels.checked} label="Em ordem decrescente (Z-A)" value="decrescente" />
          </RadioButton.Group>
          <Divider/>
          <RadioButton.Group onValueChange={chave => setChave(chave)} value={chave}>
            { valoresDeBusca.map((valorDeBusca, index) => <RadioButton.Item key={index} labelStyle={styles.dialog.labels} color={styles.dialog.labels.checked} label={valorDeBusca.titulo} value={valorDeBusca.valor} />) }
          </RadioButton.Group>
        </Dialog.Content>
        <Dialog.Actions>
          <Button labelStyle={styles.dialog.botoes} onPress={cancelar}>Cancelar</Button>
          <Button labelStyle={styles.dialog.botoes} onPress={ordenar}>Ordenar</Button>
        </Dialog.Actions>
      </Dialog>
  );
};

export default Ordenar;