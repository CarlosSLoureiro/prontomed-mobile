import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Dialog, Divider } from 'react-native-paper';

import { BuscarConsultasContrato } from '@repository/Consultas/types';

import TextInput from '@components/Formularios/TextInput';

import getStyles from './styles';

import {
  BuscarConsultaContrato,
  ValoresAtuaisFormulario
} from './types';

const Buscar = ({
  visivel,
  setVisivel,
  callback,
  valorAtual
}: BuscarConsultaContrato): JSX.Element => {
  const [valoresAtuais, setValoresAtuais] = useState<ValoresAtuaisFormulario>();

  useEffect(() => {
    if (valorAtual === undefined) {
      setValoresAtuais(undefined);
      resetarFormulario();
    }
  }, [valorAtual]);
  const styles = getStyles();

  const resetarFormulario = (): void => {
    setValor('');
  };

  // nome
  const [valor, setValor] = useState<string>('');
  // botões
  const cancelar = (): void => {
    setVisivel(false);
    if (valoresAtuais != null) {
      setValor(valoresAtuais.valor);
    } else {
      resetarFormulario();
    }
  };
  const buscar = (): void => {
    const busca: BuscarConsultasContrato = {
      valor: valor.trim(),
      finalizados: false
    };
    setVisivel(false);
    if (busca.valor.length) {
      setValoresAtuais({
        valor: busca.valor
      });
      callback(busca);
    } else {
      callback();
    }
  };

  return (
      <Dialog visible={visivel} onDismiss={cancelar} style={styles.dialog}>
        <ScrollView style={styles.dialog} keyboardShouldPersistTaps="handled" enabled={false}>
          <Dialog.Title>Como deseja buscar?</Dialog.Title>
          <Dialog.Content>
            <TextInput
              nome="Nome do paciente"
              icon="account"
              style={styles.valor}
              valor={valor}
              callback={valor => setValor(valor ?? '')}
            />
            <Divider/>
          </Dialog.Content>
          <Dialog.Actions>
            <Button labelStyle={styles.dialog.botoes} onPress={cancelar}>Cancelar</Button>
            <Button labelStyle={styles.dialog.botoes} onPress={buscar}>Buscar</Button>
          </Dialog.Actions>
        </ScrollView>
      </Dialog>
  );
};

export default Buscar;
