import { useState } from 'react';
import { Button, Dialog, Divider, TextInput } from 'react-native-paper';

import { Generos, TiposSanguineos } from '@entity/Paciente/enums';

import SelectInput from '@components/Formularios/SelectInput';

import getStyles from './styles';

import {
  BuscarPacienteCallbackContrato,
  BuscarPacienteContrato,
  ItemListagemDeGenerosContrato,
  ItemListagemDeTiposSanguineosContrato,
  ListagemDeGenerosContrato,
  ListagemDeTiposSanguineosContrato,
  ValoresAtuaisFormulario
} from './types';

const Buscar = ({
  visivel,
  setVisivel,
  callback
}: BuscarPacienteContrato): JSX.Element => {
  const [valorAtual, setValoresAtuais] = useState<ValoresAtuaisFormulario>();

  const styles = getStyles();

  // nome
  const [nome, setNome] = useState<string>('');

  // gêneros
  const todosOsGenerosSelecionados = 'Todos os gêneros';
  const listagemDeGeneros: Array<ItemListagemDeGenerosContrato> = Object.values(Generos).map((genero, index) => ({
    _id: index.toString(),
    value: genero
  }));
  const [generosFormulario, setGenerosFormulario] = useState<ListagemDeGenerosContrato>({
    valor: todosOsGenerosSelecionados,
    listagem: listagemDeGeneros,
    selecionados: listagemDeGeneros
  });
  const selecionarValoresPadraoGeneros = (): void => {
    setGenerosFormulario({
      ...generosFormulario,
      valor: todosOsGenerosSelecionados,
      selecionados: listagemDeGeneros
    });
  };
  const selecionarGenero = (value: any): void => {
    if (value.selectedList.length > 0) {
      setGenerosFormulario({
        ...generosFormulario,
        valor: (value.selectedList.length === listagemDeGeneros.length) ? todosOsGenerosSelecionados : value.text,
        selecionados: value.selectedList
      });
    } else {
      selecionarValoresPadraoGeneros();
    }
  };

  // tipos sanguíneos
  const todosOsTiposSanguineosSelecionados = 'Todos os tipos sanguíneos';
  const listagemDeTiposSanguineos: Array<ItemListagemDeTiposSanguineosContrato> = Object.values(TiposSanguineos).map((tipoSanguineo, index) => ({
    _id: index.toString(),
    value: tipoSanguineo
  }));
  const [tiposSanguineosFormulario, setTiposSanguineosFormulario] = useState<ListagemDeTiposSanguineosContrato>({
    valor: todosOsTiposSanguineosSelecionados,
    listagem: listagemDeTiposSanguineos,
    selecionados: listagemDeTiposSanguineos
  });
  const selecionarValoresPadraoTiposSanguineos = (): void => {
    setTiposSanguineosFormulario({
      ...tiposSanguineosFormulario,
      valor: todosOsTiposSanguineosSelecionados,
      selecionados: listagemDeTiposSanguineos
    });
  };
  const selecionarTipoSanguineo = (value: any): void => {
    if (value.selectedList.length > 0) {
      setTiposSanguineosFormulario({
        ...tiposSanguineosFormulario,
        valor: (value.selectedList.length === listagemDeTiposSanguineos.length) ? todosOsTiposSanguineosSelecionados : value.text,
        selecionados: value.selectedList
      });
    } else {
      selecionarValoresPadraoTiposSanguineos();
    }
  };

  // botões
  const cancelar = (): void => {
    setVisivel(false);
    if (valorAtual != null) {
      setNome(valorAtual.nome);
      setGenerosFormulario(valorAtual.generos);
      setTiposSanguineosFormulario(valorAtual.tiposSanguineos);
    } else {
      setNome('');
      selecionarValoresPadraoTiposSanguineos();
      selecionarValoresPadraoGeneros();
    }
  };
  const buscar = (): void => {
    const busca: BuscarPacienteCallbackContrato = {
      nome,
      generos: generosFormulario.valor !== todosOsGenerosSelecionados ? generosFormulario.selecionados.map(generos => generos.value) : [],
      tiposSanguineos: tiposSanguineosFormulario.valor !== todosOsTiposSanguineosSelecionados ? tiposSanguineosFormulario.selecionados.map(tipoSanguineo => tipoSanguineo.value) : []
    };
    setVisivel(false);
    if (busca.nome.length || (busca.generos.length > 0) || (busca.tiposSanguineos.length > 0)) {
      setValoresAtuais({
        nome: busca.nome,
        generos: generosFormulario,
        tiposSanguineos: tiposSanguineosFormulario
      });
      callback(busca);
    } else {
      callback();
    }
  };

  return (
      <Dialog visible={visivel} onDismiss={cancelar} style={styles.dialog}>
          <Dialog.Title>Como deseja buscar?</Dialog.Title>
          <Dialog.Content>
            <TextInput
              style={styles.nome}
              onChangeText={(nome) => setNome(nome.trim())}
              value={nome}
              mode="outlined"
              label="Nome do paciente"
              left={<TextInput.Icon icon="account" />}
            />
            <SelectInput
              titulo='Gênero do paciente'
              multi={true}
              valor={generosFormulario.valor}
              listagem={[...generosFormulario.listagem]}
              selecionados={[...generosFormulario.selecionados]}
              callback={selecionarGenero}
              style={styles.genero}
            />
            <SelectInput
              titulo='Tipo sanguíneo do paciente'
              selecionarTodos={true}
              multi={true}
              valor={tiposSanguineosFormulario.valor}
              listagem={[...tiposSanguineosFormulario.listagem]}
              selecionados={[...tiposSanguineosFormulario.selecionados]}
              callback={selecionarTipoSanguineo}
              style={styles.tipoSanguineo}
            />
            <Divider/>
          </Dialog.Content>
          <Dialog.Actions>
            <Button labelStyle={styles.dialog.botoes} onPress={cancelar}>Cancelar</Button>
            <Button labelStyle={styles.dialog.botoes} onPress={buscar}>Buscar</Button>
          </Dialog.Actions>
        </Dialog>
  );
};

export default Buscar;
