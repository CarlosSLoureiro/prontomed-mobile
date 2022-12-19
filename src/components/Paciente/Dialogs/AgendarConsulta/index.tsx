import { useState } from 'react';
import { Button, Dialog, Divider, Text } from 'react-native-paper';

import Paciente from '@entity/Paciente';

import getStyles from './styles';

import { AgendarConsultaContrato, AgendarConsultaRefContrato } from './types';

const AgendarConsulta = ({
  formularioRef,
  callback
}: AgendarConsultaContrato): JSX.Element => {
  const styles = getStyles();
  const [visivel, setVisivel] = useState(false);
  const [paciente, setPaciente] = useState<Paciente | undefined>();

  const agendarConsulta: AgendarConsultaRefContrato = (paciente: Paciente): void => {
    setVisivel(true);
    setPaciente(paciente);
  };

  if (formularioRef !== undefined) {
    formularioRef.current = agendarConsulta;
  }

  const cancelar = (): void => {
    setVisivel(false);
  };
  const agendar = (): void => {
    void (async () => {
      const resultado = (paciente !== undefined) ? await callback(paciente, new Date()) : undefined;
      if (resultado !== undefined) {
        cancelar();
      }
    })();
  };

  return (
      <Dialog visible={visivel} onDismiss={cancelar} style={styles.dialog}>
        <Dialog.Title>Agendar consulta</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.text}>
            {(
              (paciente !== undefined)
                ? `Selecione a data que deseja agendar uma consulta com o (a) paciente ${paciente.nome}`
                : 'Paciente indefinido'
            )}
          </Text>
          <Divider/>
        </Dialog.Content>
        <Dialog.Actions>
          <Button labelStyle={styles.dialog.botoes} onPress={cancelar}>Cancelar</Button>
          <Button labelStyle={styles.dialog.botoes} onPress={agendar}>Agendar</Button>
        </Dialog.Actions>
        </Dialog>
  );
};

export default AgendarConsulta;
