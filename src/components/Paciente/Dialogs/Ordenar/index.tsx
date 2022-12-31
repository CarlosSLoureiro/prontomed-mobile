import { useEffect, useState } from 'react';
import { Button, Dialog, Divider, RadioButton, useTheme } from 'react-native-paper';

import { OrdenacaoPacientesContrato, ValoresDeBuscaPacientes, ValoresDeOrdemPacientes } from '@repository/Pacientes/types';

import getStyles from './styles';

import { OrdenarContrato } from './types';

const Ordenar = ({
  visivel,
  setVisivel,
  callback,
  valorAtual,
  valoresDeBusca
}: OrdenarContrato): JSX.Element => {
  const theme = useTheme();
  const styles = getStyles();

  const [ordem, setOrdem] = useState(valorAtual.ordem);
  const [chave, setChave] = useState(valorAtual.chave);

  useEffect(() => {
    setOrdem(valorAtual.ordem);
    setChave(valorAtual.chave);
  }, [valorAtual]);

  const cancelar = (): void => {
    setVisivel(false);
    setOrdem(valorAtual.ordem);
    setChave(valorAtual.chave);
  };

  const ordenar = (): void => {
    setVisivel(false);
    const ordenacao: OrdenacaoPacientesContrato = {
      ordem,
      chave
    };
    callback(ordenacao);
  };

  return (
      <Dialog theme={theme} visible={visivel} onDismiss={cancelar}>
        <Dialog.Title>Como deseja ordenar?</Dialog.Title>
        <Dialog.Content>
          <RadioButton.Group onValueChange={valor => setOrdem(valor as ValoresDeOrdemPacientes)} value={ordem}>
            <RadioButton.Item color={styles.botoes.labelsChecked} label="Em ordem crescente (A-Z)" value="crescente" />
            <RadioButton.Item color={styles.botoes.labelsChecked} label="Em ordem decrescente (Z-A)" value="decrescente" />
          </RadioButton.Group>
          <Divider/>
          <RadioButton.Group onValueChange={chave => setChave(chave as ValoresDeBuscaPacientes)} value={chave}>
            { valoresDeBusca.map((valorDeBusca, index) => <RadioButton.Item key={index} color={styles.botoes.labelsChecked} label={valorDeBusca.titulo} value={valorDeBusca.valor} />) }
          </RadioButton.Group>
        </Dialog.Content>
        <Dialog.Actions>
          <Button labelStyle={styles.botoes} onPress={cancelar}>Cancelar</Button>
          <Button labelStyle={styles.botoes} onPress={ordenar}>Ordenar</Button>
        </Dialog.Actions>
      </Dialog>
  );
};

export default Ordenar;
