import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';
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

  const [posicaoDialog, setPosicaoDialog] = useState('70%');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setPosicaoDialog('70%')
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setPosicaoDialog('0%')
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    setPosicaoDialog('70%');
  }, [visivel]);

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
      const msg = observacao.mensagem ?? '';
      if (msg?.length > 0) {
        void (async () => {
          const resultado = await callback(observacao);
          if (resultado !== undefined) {
            cancelar();
          }
        })();
      }
    }
  };

  return (
      <Dialog visible={visivel} onDismiss={cancelar} style={{ ...styles.dialog, marginBottom: Platform.OS === 'ios' ? posicaoDialog : 0 }}>
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
