import { Button, Dialog, Divider, Text } from 'react-native-paper';

import getStyles from './styles';

import { AgendarConsultaEmConflitoContrato } from './types';

const AgendarConsultaEmConflito = ({
  visivel,
  setVisivel,
  mensagem,
  consulta,
  callback
}: AgendarConsultaEmConflitoContrato): JSX.Element => {
  const styles = getStyles();

  const cancelar = (): void => {
    setVisivel(false);
  };

  const continuar = (): void => {
    if (callback !== undefined) {
      void (async () => {
        if (consulta.paciente !== undefined && consulta.dataAgendada !== undefined) {
          await callback(consulta.paciente, consulta.dataAgendada, true);
          setVisivel(false);
        }
      })();
    }
  };

  return (
      <Dialog visible={visivel} onDismiss={cancelar} style={styles.dialog}>
        <Dialog.Title>Tem certeza?</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.text}>{ mensagem }</Text>
          <Divider/>
        </Dialog.Content>
        <Dialog.Actions>
          <Button labelStyle={styles.dialog.botoes} onPress={cancelar}>Cancelar</Button>
          <Button labelStyle={styles.dialog.botoes} onPress={continuar}>Continuar</Button>
        </Dialog.Actions>
      </Dialog>
  );
};

export default AgendarConsultaEmConflito;
