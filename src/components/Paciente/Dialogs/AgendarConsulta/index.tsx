import { useState } from 'react';
import { Button, Dialog, Divider, Text, useTheme } from 'react-native-paper';

import Paciente from '@entity/Paciente';

import DateTimePicker from '@components/Formularios/DateTimePicker';

import getStyles from './styles';

import { AgendarConsultaContrato } from './types';

const AgendarConsulta = ({
  visivel,
  setVisivel,
  formularioRef,
  callback
}: AgendarConsultaContrato): JSX.Element => {
  const theme = useTheme();
  const styles = getStyles();

  const [data, setData] = useState<Date | undefined>();
  const [paciente, setPaciente] = useState<Paciente | undefined>();

  const abrirDialog = (paciente: Paciente, dataConsulta?: Date): void => {
    setData(dataConsulta);
    setVisivel(true);
    setPaciente(paciente);
  };

  if (formularioRef !== undefined) {
    formularioRef.current = {
      abrirDialog
    };
  }

  const cancelar = (): void => {
    setVisivel(false);
  };

  const agendar = (): void => {
    void (async () => {
      const resultado = (paciente !== undefined && data !== undefined)
        ? await callback(paciente, data)
        : undefined;

      if (resultado !== undefined) {
        cancelar();
      }
    })();
  };

  return (
      <Dialog theme={theme} visible={visivel} onDismiss={cancelar}>
        <Dialog.Title>Agendar consulta</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.text}>
            {(
              (paciente !== undefined)
                ? `Selecione a data que deseja agendar uma consulta com ${paciente.nome}`
                : 'Paciente indefinido'
            )}
          </Text>
          <DateTimePicker
            style={styles.input}
            nome="Data da consulta"
            valor={data}
            callback={setData}
          />
          <Divider/>
        </Dialog.Content>
        <Dialog.Actions>
          <Button labelStyle={styles.botoes} onPress={cancelar}>Cancelar</Button>
          <Button labelStyle={styles.botoes} onPress={agendar}>Agendar</Button>
        </Dialog.Actions>
      </Dialog>
  );
};

export default AgendarConsulta;
