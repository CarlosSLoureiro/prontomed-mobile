import { useState } from 'react';
import { Button, Dialog, Divider, Text } from 'react-native-paper';

import Consulta from '@entity/Consulta';
import { Generos } from '@entity/Paciente/enums';

import getStyles from './styles';

import { ExcluirConsultaContrato } from './types';

const Excluir = ({
  formularioRef,
  callback
}: ExcluirConsultaContrato): JSX.Element => {
  const styles = getStyles();
  const [visivel, setVisivel] = useState(false);
  const [consulta, setConsulta] = useState<Consulta | undefined>();

  const abrirDialog = (consulta: Consulta): void => {
    setVisivel(true);
    setConsulta(consulta);
  };

  if (formularioRef !== undefined) {
    formularioRef.current = {
      abrirDialog
    };
  }

  const cancelar = (): void => {
    setVisivel(false);
  };
  const excluir = (): void => {
    void (async () => {
      const resultado = (consulta !== undefined) ? await callback(consulta) : undefined;
      if (resultado !== undefined) {
        cancelar();
      }
    })();
  };

  const obterTexto = (): string => {
    if (consulta === undefined) {
      return 'Consulta indefinida';
    } else if (consulta.paciente !== null) {
      return `A consulta Nº ${consulta.id} com ${consulta.paciente.genero === Generos.FEMININO ? 'a' : 'o'} paciente ${consulta.paciente.nome} será excluída`;
    } else {
      return `A consulta Nº ${consulta.id} será excluída`;
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
          <Button color={styles.dialog.excluir.color} labelStyle={styles.dialog.excluir} onPress={excluir}>Excluir</Button>
        </Dialog.Actions>
        </Dialog>
  );
};

export default Excluir;
