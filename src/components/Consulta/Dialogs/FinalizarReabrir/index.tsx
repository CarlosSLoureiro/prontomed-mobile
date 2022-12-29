import { useState } from 'react';
import { Button, Dialog, Divider, Text } from 'react-native-paper';

import Consulta from '@entity/Consulta';

import getStyles from './styles';

import { ExcluirConsultaContrato } from './types';

const FinalizarReabrir = ({
  visivel,
  setVisivel,
  formularioRef,
  callbackFinalizar,
  callbackReabrir
}: ExcluirConsultaContrato): JSX.Element => {
  const styles = getStyles();
  const [consulta, setConsulta] = useState<Consulta | undefined>();
  const [finalizar, setFinalizar] = useState(true);

  const abrirDialog = (consulta: Consulta, finalizar: boolean): void => {
    setVisivel(true);
    setConsulta(consulta);
    setFinalizar(finalizar);
  };

  if (formularioRef !== undefined) {
    formularioRef.current = {
      abrirDialog
    };
  }

  const cancelar = (): void => {
    setVisivel(false);
  };

  const finalizarConsulta = (): void => {
    void (async () => {
      const resultado = (consulta !== undefined) ? await callbackFinalizar(consulta) : undefined;
      if (resultado !== undefined) {
        cancelar();
      }
    })();
  };

  const reabrirConsulta = (): void => {
    void (async () => {
      const resultado = (consulta !== undefined) ? await callbackReabrir(consulta) : undefined;
      if (resultado !== undefined) {
        cancelar();
      }
    })();
  };

  const obterTexto = (): string => {
    if (consulta === undefined) {
      return 'Consulta indefinida';
    } else if (finalizar) {
      return `A consulta Nº ${consulta.id} será finalizada`;
    } else {
      return `A consulta Nº ${consulta.id} será reaberta`;
    }
  };

  return (
      <Dialog visible={visivel} onDismiss={cancelar} style={styles.dialog}>
        <Dialog.Title>Tem certeza?</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.text}>
            { obterTexto() }
          </Text>
          <Divider/>
        </Dialog.Content>
        <Dialog.Actions>
          <Button labelStyle={styles.dialog.botoes} onPress={cancelar}>Cancelar</Button>
          <Button labelStyle={styles.dialog.botoes} onPress={finalizar ? finalizarConsulta : reabrirConsulta}>{finalizar ? 'Finalizar' : 'Reabrir'}</Button>
        </Dialog.Actions>
        </Dialog>
  );
};

export default FinalizarReabrir;
