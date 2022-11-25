import { useState } from 'react';
import { Dialog, TextInput, Divider, Button } from 'react-native-paper';
import { PaperSelect } from 'react-native-paper-select';
import { generos, tipos_sanguineos } from '@utils/enums/paciente';
import {
  BuscarContrato,
  ListagemDeGenerosContrato,
  ItemListagemDeGenerosContrato,
  ItemListagemDeTiposSanguineosContrato,
  ListagemDeTiposSanguineosContrato,
  ValoresAtuaisFormulario
} from './types';
import { BuscaContrato } from '@screens/Principal/Consultas/types';

const Buscar = ({
  visivel,
  setVisivel,
  callback
}: BuscarContrato): JSX.Element => {
  const [valorAtual,
    setValoresAtuais] = useState<ValoresAtuaisFormulario>();

  // nome
  const [nome, setNome] = useState<string>('');

  // gêneros
  const todosOsGenerosSelecionados = 'Todos os gêneros';
  const listagemDeGeneros: Array<ItemListagemDeGenerosContrato> = Object.values(generos).map((genero, index) => ({
    _id: index.toString(),
    value: genero
  }));
  const [generosFormulario, setGenerosFormulario] = useState<ListagemDeGenerosContrato>({
    valor: todosOsGenerosSelecionados,
    listagem: listagemDeGeneros,
    selecionados: listagemDeGeneros
  });
  const selecionarValoresPadraoGeneros = () => {
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
  const listagemDeTiposSanguineos: Array<ItemListagemDeTiposSanguineosContrato> = Object.values(tipos_sanguineos).map((tipoSanguineo, index) => ({
    _id: index.toString(),
    value: tipoSanguineo
  }));
  const [tiposSanguineosFormulario, setTiposSanguineosFormulario] = useState<ListagemDeTiposSanguineosContrato>({
    valor: todosOsTiposSanguineosSelecionados,
    listagem: listagemDeTiposSanguineos,
    selecionados: listagemDeTiposSanguineos
  });
  const selecionarValoresPadraoTiposSanguineos = () => {
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
  const cancelar = () => {
    setVisivel(false);
    if (valorAtual != null) {
      setNome(valorAtual.nome);
      setGenerosFormulario(valorAtual.generos);
      setTiposSanguineosFormulario(valorAtual.tipos_sanguineos);
    } else {
      setNome('');
      selecionarValoresPadraoTiposSanguineos();
      selecionarValoresPadraoGeneros();
    }
  };
  const buscar = (): void => {
    const busca: BuscaContrato = {
      nome,
      generos: generosFormulario.valor !== todosOsGenerosSelecionados ? generosFormulario.selecionados.map(generos => generos.value) : [],
      tipos_sanguineos: tiposSanguineosFormulario.valor !== todosOsTiposSanguineosSelecionados ? tiposSanguineosFormulario.selecionados.map(tipoSanguineo => tipoSanguineo.value) : []
    };
    setVisivel(false);
    if (busca.nome.length || (busca.generos.length > 0) || (busca.tipos_sanguineos.length > 0)) {
      setValoresAtuais({
        nome: busca.nome,
        generos: generosFormulario,
        tipos_sanguineos: tiposSanguineosFormulario
      });
      callback(busca);
    } else {
      callback();
    }
  };

  return (
      <Dialog visible={visivel} onDismiss={cancelar}>
          <Dialog.Title>Como deseja buscar?</Dialog.Title>
          <Dialog.Content>
            <TextInput
              onChangeText={(nome) => setNome(nome.trim())}
              value={nome}
              mode="outlined"
              label="Nome do paciente"
              left={<TextInput.Icon icon="account" />}
            />
            <PaperSelect
              hideSearchBox={true}
              label="Gênero do paciente"
              modalCloseButtonText="Cancelar"
              modalDoneButtonText="Selecionar"
              value={generosFormulario.valor}
              onSelection={selecionarGenero}
              arrayList={[...generosFormulario.listagem]}
              selectedArrayList={[...generosFormulario.selecionados]}
              multiEnable={true}
              errorText=""
            />
            <PaperSelect
              hideSearchBox={false}
              searchPlaceholder="Buscar"
              label="Tipo sanguíneo do paciente"
              modalCloseButtonText="Cancelar"
              modalDoneButtonText="Selecionar"
              value={tiposSanguineosFormulario.valor}
              onSelection={selecionarTipoSanguineo}
              arrayList={[...tiposSanguineosFormulario.listagem]}
              selectedArrayList={[...tiposSanguineosFormulario.selecionados]}
              multiEnable={true}
              errorText=""
            />
            <Divider/>
          </Dialog.Content>
          <Dialog.Actions>
            <Button color='#000000' onPress={buscar}>Buscar</Button>
            <Button color='#000000' onPress={cancelar}>Cancelar</Button>
          </Dialog.Actions>
        </Dialog>
  );
};

export default Buscar;
