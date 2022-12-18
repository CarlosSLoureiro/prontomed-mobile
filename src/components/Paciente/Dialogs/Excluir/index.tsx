import { useState } from 'react';
import { Button, Dialog, Divider, Text } from 'react-native-paper';

import Paciente from '@entity/Paciente';
import { Generos } from '@entity/Paciente/enums';

import getStyles from './styles';

import { ExcluirPacienteContrato, ExcluirPacienteRefContrato } from './types';

const Excluir = ({
  formularioRef,
  callback
}: ExcluirPacienteContrato): JSX.Element => {
  const styles = getStyles();
  const [visivel, setVisivel] = useState(false);
  const [paciente, setPaciente] = useState<Paciente | undefined>();

  const excluirPaciente: ExcluirPacienteRefContrato = (paciente: Paciente): void => {
    setVisivel(true);
    setPaciente(paciente);
  };

  if (formularioRef !== undefined) {
    formularioRef.current = excluirPaciente;
  }

  const obterMaasculinoFeminino = (palavra: string): string => {
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
        return `${obterMaasculinoFeminino('O').toUpperCase()} paciente ${paciente.nome} possui ${totalConsultas} consultas. As consultas serão mantidas e ${obterMaasculinoFeminino('o')} paciente ${obterMaasculinoFeminino('excluído')}`;
      } else if (totalConsultas === 1) {
        return `${obterMaasculinoFeminino('O').toUpperCase()} paciente ${paciente.nome} possui 1 consulta. A consulta será mantida e ${obterMaasculinoFeminino('o')} paciente ${obterMaasculinoFeminino('excluído')}`;
      } else {
        return `${obterMaasculinoFeminino('O').toUpperCase()} paciente ${paciente.nome} será ${obterMaasculinoFeminino('excluído')}.`;
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
      <Dialog visible={visivel} onDismiss={cancelar} style={styles.dialog}>
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
          <Button labelStyle={styles.dialog.botoes} onPress={cancelar}>Cancelar</Button>
          <Button color={styles.dialog.excluir.color} labelStyle={styles.dialog.excluir} onPress={excluir}>Excluir</Button>
        </Dialog.Actions>
        </Dialog>
  );
};

export default Excluir;
