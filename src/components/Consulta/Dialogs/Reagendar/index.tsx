import { useEffect, useState } from 'react';
import { Button, Dialog, Divider, Text } from 'react-native-paper';

import Consulta from '@entity/Consulta';
import { Generos } from '@entity/Paciente/enums';

import DateTimePicker from '@components/Formularios/DateTimePicker';

import getStyles from './styles';

import { ReagendarConsultaContrato } from './types';

import moment from 'moment';

const ReagendarConsulta = ({
  visivel,
  setVisivel,
  formularioRef,
  callback
}: ReagendarConsultaContrato): JSX.Element => {
  const styles = getStyles();
  const [data, setData] = useState<Date | undefined>();
  const [consulta, setConsulta] = useState<Consulta | undefined>();

  const abrirDialog = (consulta: Consulta): void => {
    setConsulta(consulta);
    setVisivel(true);
  };

  if (formularioRef !== undefined) {
    formularioRef.current = {
      abrirDialog
    };
  }

  const cancelar = (): void => {
    setData(undefined);
    setVisivel(false);
  };

  const reagendar = (): void => {
    void (async () => {
      const resultado = (consulta !== undefined && data !== undefined)
        ? await callback(consulta)
        : undefined;

      if (resultado !== undefined) {
        cancelar();
      }
    })();
  };

  useEffect(() => {
    if (data !== undefined && consulta !== undefined) {
      setConsulta({
        ...consulta,
        dataAgendada: data
      });
    }
  }, [data]);

  return (
      <Dialog visible={visivel} onDismiss={cancelar} style={styles.dialog}>
        <Dialog.Title>Reagendar consulta Nº { consulta?.id }</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.text}>
            A consulta com {consulta?.paciente.genero === Generos.FEMININO ? 'a' : 'o'} paciente { consulta?.paciente.nome } está atualmente agendada para {moment(consulta?.dataAgendada).format('DD/MM/YYYY [as] HH[h]mm')}
          </Text>
          <DateTimePicker
            style={styles.input}
            nome="Nova data da consulta"
            valor={data}
            callback={setData}
          />
          <Divider/>
        </Dialog.Content>
        <Dialog.Actions>
          <Button labelStyle={styles.dialog.botoes} onPress={cancelar}>Cancelar</Button>
          <Button labelStyle={styles.dialog.botoes} onPress={reagendar}>Reagendar</Button>
        </Dialog.Actions>
      </Dialog>
  );
};

export default ReagendarConsulta;
