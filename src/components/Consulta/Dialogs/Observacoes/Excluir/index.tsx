import { useState } from 'react';
import { Button, Dialog, Divider, Text, useTheme } from 'react-native-paper';

import Observacao from '@entity/Observacao';

import getStyles from './styles';

import { ExcluirObservacaoContrato } from './types';

const Excluir = ({
  visivel,
  setVisivel,
  formularioRef,
  callback
}: ExcluirObservacaoContrato): JSX.Element => {
  const theme = useTheme();
  const styles = getStyles();

  const [observacao, setObservacao] = useState<Observacao | undefined>();

  const abrirDialog = (obs: Observacao): void => {
    setVisivel(true);
    setObservacao(obs);
  };

  if (formularioRef !== undefined) {
    formularioRef.current = {
      abrirDialog
    };
  }

  const cancelar = (): void => {
    setVisivel(false);
  };

  const excluir = (): void => {
    void (async () => {
      const resultado = (observacao !== undefined) ? await callback(observacao) : undefined;
      if (resultado !== undefined) {
        cancelar();
      }
    })();
  };

  return (
      <Dialog theme={theme} visible={visivel} onDismiss={cancelar}>
        <Dialog.Title>Tem certeza?</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.text}>A observação &ldquo;<Text style={styles.msg}>{ observacao?.mensagem }</Text>&rdquo; selecionada será excluída</Text>
          <Divider/>
        </Dialog.Content>
        <Dialog.Actions>
          <Button labelStyle={styles.botoes} onPress={cancelar}>Cancelar</Button>
          <Button color={styles.excluir.color} labelStyle={styles.excluir} onPress={excluir}>Excluir</Button>
        </Dialog.Actions>
        </Dialog>
  );
};

export default Excluir;
