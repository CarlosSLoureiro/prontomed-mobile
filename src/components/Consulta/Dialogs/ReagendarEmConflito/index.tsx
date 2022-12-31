import { Button, Dialog, Divider, Text, useTheme } from 'react-native-paper';

import getStyles from './styles';

import { ReagendarEmConflitoContrato } from './types';

const ReagendarEmConflito = ({
  visivel,
  setVisivel,
  mensagem,
  consulta,
  callback
}: ReagendarEmConflitoContrato): JSX.Element => {
  const theme = useTheme();
  const styles = getStyles();

  const cancelar = (): void => {
    setVisivel(false);
  };

  const continuar = (): void => {
    if (callback !== undefined) {
      void (async () => {
        if (consulta !== undefined) {
          await callback(consulta, true);
          setVisivel(false);
        }
      })();
    }
  };

  return (
      <Dialog theme={theme} visible={visivel} onDismiss={cancelar}>
        <Dialog.Title>Tem certeza?</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.text}>{ mensagem }</Text>
          <Divider/>
        </Dialog.Content>
        <Dialog.Actions>
          <Button labelStyle={styles.botoes} onPress={cancelar}>Cancelar</Button>
          <Button labelStyle={styles.botoes} onPress={continuar}>Continuar</Button>
        </Dialog.Actions>
      </Dialog>
  );
};

export default ReagendarEmConflito;
