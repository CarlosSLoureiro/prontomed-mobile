import { useState } from 'react';
import { Button, Dialog, Divider, TextInput } from 'react-native-paper';

import Paciente from '@entity/Paciente';
import { Generos, TiposSanguineos } from '@entity/Paciente/enums';

import { ItemListagemDeGenerosContrato } from '@components/Consulta/Dialogs/Buscar/types';
import SelectInput from '@components/Formularios/SelectInput';

import getStyles from './styles';

import { CadastrarPacienteContrato } from './types';

const Cadastrar = ({
  visivel,
  setVisivel,
  callback
}: CadastrarPacienteContrato): JSX.Element => {
  const styles = getStyles();

  // nome
  const [paciente, setPaciente] = useState<Partial<Paciente>>({});

  // gênero
  const listagemDeGeneros: Array<ItemListagemDeGenerosContrato> = Object.values(Generos).map((genero, index) => ({
    _id: index.toString(),
    value: genero
  }));
  const selecionarGenero = (value: any): void => {
    setPaciente({
      ...paciente,
      genero: (value.selectedList.length > 0) ? value.text as Generos : undefined
    });
  };

  // botões
  const cancelar = (): void => {
    setVisivel(false);
    setPaciente({});
  };
  const cadastrar = (): void => {
    setVisivel(false);
    callback(paciente);
    setPaciente({});
  };

  return (
      <Dialog visible={visivel} onDismiss={cancelar} style={styles.dialog}>
          <Dialog.Title>Como deseja buscar?</Dialog.Title>
          <Dialog.Content>
            <TextInput
              style={styles.nome}
              onChangeText={nome => setPaciente({
                ...paciente,
                nome: nome.trim()
              })}
              mode="outlined"
              label="Nome do paciente"
              left={<TextInput.Icon icon="account" />}
            />
            <SelectInput
              titulo='Gênero do paciente'
              multi={false}
              valor={paciente.genero ?? 'Selecionar'}
              listagem={listagemDeGeneros}
              selecionados={listagemDeGeneros.filter(item => item.value === paciente.genero)}
              callback={selecionarGenero}
              style={styles.genero}
            />
            <Divider/>
          </Dialog.Content>
          <Dialog.Actions>
            <Button labelStyle={styles.dialog.botoes} onPress={cancelar}>Cancelar</Button>
            <Button labelStyle={styles.dialog.botoes} onPress={cadastrar}>Cadastrar</Button>
          </Dialog.Actions>
        </Dialog>
  );
};

export default Cadastrar;
