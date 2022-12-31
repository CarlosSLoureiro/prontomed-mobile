import { useEffect, useState } from 'react';
import { Switch, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Dialog, Divider, useTheme } from 'react-native-paper';

import { BuscarConsultasContrato } from '@repository/Consultas/types';

import TextInput from '@components/Formularios/TextInput';

import getStyles from './styles';

import { BuscarConsultaContrato } from './types';

const Buscar = ({
  visivel,
  setVisivel,
  callback,
  valorAtual
}: BuscarConsultaContrato): JSX.Element => {
  const theme = useTheme();
  const styles = getStyles();

  const [valoresAtuais, setValoresAtuais] = useState<BuscarConsultasContrato>();
  const [icone, setIcone] = useState<string>('clipboard-list-outline');
  const [valor, setValor] = useState<string>('');
  const [incluirFinalizadas, setIncluirFinalizadas] = useState(false);

  const resetarFormulario = (): void => {
    setIncluirFinalizadas(false);
    setValor('');
  };

  useEffect(() => {
    if (valorAtual === undefined) {
      setValoresAtuais(undefined);
      resetarFormulario();
    }
  }, [valorAtual]);

  useEffect(() => {
    setIcone(/^\d+$/.test(valor) || !valor.length ? 'clipboard-list-outline' : 'account');
  }, [valor]);

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
      valor: valor.trim().length > 0 ? valor.trim() : '',
      finalizadas: incluirFinalizadas
    };
    setVisivel(false);
    if (busca.valor.length > 0 || busca.finalizadas) {
      setValoresAtuais({
        valor: busca.valor,
        finalizadas: valorAtual?.finalizadas ?? false
      });
      callback(busca);
    } else {
      callback();
    }
  };

  return (
      <Dialog theme={theme} visible={visivel} onDismiss={cancelar}>
        <ScrollView keyboardShouldPersistTaps="handled" enabled={false}>
          <Dialog.Title>Como deseja buscar?</Dialog.Title>
          <Dialog.Content>
            <TextInput
              nome="Nº da consulta, nome do paciente"
              icon={icone}
              style={styles.valor}
              valor={valor}
              callback={valor => setValor(valor ?? '')}
            />
            <View style={styles.incluirFinalizadas}>
              <Text style={styles.incluirFinalizadas.text}>Incluir consultas finalizadas</Text>
              <Switch style={styles.botaoSwitch} value={incluirFinalizadas} onValueChange={setIncluirFinalizadas} />
            </View>
            <Divider/>
          </Dialog.Content>
          <Dialog.Actions>
            <Button labelStyle={styles.botoes} onPress={cancelar}>Cancelar</Button>
            <Button labelStyle={styles.botoes} onPress={buscar}>Buscar</Button>
          </Dialog.Actions>
        </ScrollView>
      </Dialog>
  );
};

export default Buscar;
