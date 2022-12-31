import { useState } from 'react';
import { Button, Dialog, Divider, Text, useTheme } from 'react-native-paper';

import Paciente from '@entity/Paciente';
import { Generos } from '@entity/Paciente/enums';

import getStyles from './styles';

import { ExcluirPacienteContrato } from './types';

const Excluir = ({
  visivel,
  setVisivel,
  formularioRef,
  callback
}: ExcluirPacienteContrato): JSX.Element => {
  const theme = useTheme();
  const styles = getStyles();

  const [paciente, setPaciente] = useState<Paciente | undefined>();

  const abrirDialog = (paciente: Paciente): void => {
    setVisivel(true);
    setPaciente(paciente);
  };

  if (formularioRef !== undefined) {
    formularioRef.current = {
      abrirDialog
    };
  }

  const obterMasculinoFeminino = (palavra: string): string => {
    palavra = palavra.toLowerCase();

    if (paciente?.genero === Generos.FEMININO) {
      switch (palavra) {
        case 'o': return 'a';
        case 'excluído': return 'excluída';
        default: return palavra;
      }
    } else {
      return palavra;
    }
  };

  const obterTextoModal = (totalConsultas: number): string => {
    if (paciente !== undefined) {
      if (totalConsultas > 1) {
        return `${obterMasculinoFeminino('O').toUpperCase()} paciente ${paciente.nome} possui ${totalConsultas} consultas. As consultas serão mantidas e ${obterMasculinoFeminino('o')} paciente ${obterMasculinoFeminino('excluído')}`;
      } else if (totalConsultas === 1) {
        return `${obterMasculinoFeminino('O').toUpperCase()} paciente ${paciente.nome} possui 1 consulta. A consulta será mantida e ${obterMasculinoFeminino('o')} paciente ${obterMasculinoFeminino('excluído')}`;
      } else {
        return `${obterMasculinoFeminino('O').toUpperCase()} paciente ${paciente.nome} será ${obterMasculinoFeminino('excluído')}.`;
      }
    } else {
      return 'Paciente indefinido';
    }
  };

  const cancelar = (): void => {
    setVisivel(false);
  };
  const excluir = (): void => {
    void (async () => {
      const resultado = (paciente !== undefined) ? await callback(paciente) : undefined;
      if (resultado !== undefined) {
        cancelar();
      }
    })();
  };

  return (
      <Dialog theme={theme} visible={visivel} onDismiss={cancelar}>
        <Dialog.Title>Tem certeza?</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.text}>
            {(
              (paciente?.consultas !== undefined)
                ? obterTextoModal(paciente.consultas.length)
                : 'Total de consultas indefinidas'
            )}
          </Text>
          <Divider/>
        </Dialog.Content>
        <Dialog.Actions>
          <Button labelStyle={styles.botoes} onPress={cancelar}>Cancelar</Button>
          <Button color={styles.excluir.color} labelStyle={styles.excluir} onPress={excluir}>Excluir</Button>
        </Dialog.Actions>
      </Dialog>
  );
};

export default Excluir;
