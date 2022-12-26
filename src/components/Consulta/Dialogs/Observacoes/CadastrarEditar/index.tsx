import { useState } from 'react';
import { Platform } from 'react-native';
import { Button, Dialog, Divider } from 'react-native-paper';

import Observacao from '@entity/Observacao';

import TextArea from '@components/Formularios/TextArea';

import getStyles from './styles';

import { CadastrarObservacaoContrato } from './types';

const CadastrarEditarObservacao = ({
  visivel,
  setVisivel,
  formularioRef,
  callback
}: CadastrarObservacaoContrato): JSX.Element => {
  const styles = getStyles();
  const [observacao, setObservacao] = useState<Partial<Observacao>>({});

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
    setObservacao({});
  };

  const salvar = (): void => {
    if (observacao !== undefined) {
      void (async () => {
        const resultado = (observacao !== undefined) ? await callback(observacao) : undefined;
        if (resultado !== undefined) {
          cancelar();
        }
      })();
    }
  };

  return (
      <Dialog visible={visivel} onDismiss={cancelar} style={{ ...styles.dialog, marginBottom: Platform.OS === 'ios' ? '70%' : 0 }}>
        <Dialog.Title>Agendar consulta</Dialog.Title>
        <Dialog.Content>
            <TextArea
                focar={true}
                nome="Observação"
                valor={observacao?.mensagem ?? ''}
                style={styles.textInput}
                callback={mensagem => setObservacao({
                  ...observacao,
                  mensagem
                })}
            />
          <Divider/>
        </Dialog.Content>
        <Dialog.Actions>
          <Button labelStyle={styles.dialog.botoes} onPress={cancelar}>Cancelar</Button>
          <Button labelStyle={styles.dialog.botoes} onPress={salvar}>Salvar</Button>
        </Dialog.Actions>
      </Dialog>
  );
};

export default CadastrarEditarObservacao;
