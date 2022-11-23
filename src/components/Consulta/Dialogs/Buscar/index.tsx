import { useState } from "react";
import { Dialog, TextInput, Divider, Button } from "react-native-paper";
import { PaperSelect } from "react-native-paper-select";
import { generos, tipos_sanguineos } from "@utils/enums/paciente";
import {
  BuscarContrato,
  ListagemDeGenerosContrato,
  ItemListagemDeGenerosContrato,
  ItemListagemDeTiposSanguineosContrato,
  ListagemDeTiposSanguineosContrato
} from "./types";
import { BuscaContrato } from "@screens/Principal/Consultas/types";

const Buscar = ({
    visivel,
    setVisivel,
    callback
}:BuscarContrato) => {
  // nome
  const [nome, setNome] = useState<string>('');

  // gêneros
  const todosOsGenerosSelecionados = 'Todos os gêneros';
  const listagemDeGeneros:Array<ItemListagemDeGenerosContrato> = Object.values(generos).map((genero, index) => ({
    _id: index.toString(),
    value: genero
  }));
  const [generosFormulario, setGenerosFormulario] = useState<ListagemDeGenerosContrato>({
    valor: todosOsGenerosSelecionados,
    listagem: listagemDeGeneros,
    selecionados: listagemDeGeneros,
  });
  const selecionarGenero = (value: any) => {
    if (value.selectedList.length > 0) {
      setGenerosFormulario({
        ...generosFormulario,
        valor: (value.selectedList.length === listagemDeGeneros.length) ? todosOsGenerosSelecionados : value.text,
        selecionados: value.selectedList
      });
    } else {
      setGenerosFormulario({
        ...generosFormulario,
        valor: todosOsGenerosSelecionados,
        selecionados: listagemDeGeneros,
      });
    }
  }

  // tipos sanguíneos
  const todosOsTiposSanguineosSelecionados = 'Todos os tipos sanguíneos';
  const listagemDeTiposSanguineos:Array<ItemListagemDeTiposSanguineosContrato> = Object.values(tipos_sanguineos).map((tipoSanguineo, index) => ({
    _id: index.toString(),
    value: tipoSanguineo
  }));
  const [tiposSanguineosFormulario, setTiposSanguineosFormulario] = useState<ListagemDeTiposSanguineosContrato>({
    valor: todosOsTiposSanguineosSelecionados,
    listagem: listagemDeTiposSanguineos,
    selecionados: listagemDeTiposSanguineos,
  });
  const selecionarTipoSanguineo = (value: any) => {
    if (value.selectedList.length > 0) {
      setTiposSanguineosFormulario({
        ...tiposSanguineosFormulario,
        valor: (value.selectedList.length === listagemDeTiposSanguineos.length) ? todosOsTiposSanguineosSelecionados : value.text,
        selecionados: value.selectedList
      });
    } else {
      setTiposSanguineosFormulario({
        ...tiposSanguineosFormulario,
        valor: todosOsTiposSanguineosSelecionados,
        selecionados: listagemDeTiposSanguineos,
      });
    }
  }

  // botões
  const cancelar = () => setVisivel(false);
  const buscar = () => {
    const busca:BuscaContrato = {
      nome,
      generos: generosFormulario.valor !== todosOsGenerosSelecionados ? generosFormulario.selecionados.map(generos => generos.value) : [],
      tipos_sanguineos: tiposSanguineosFormulario.valor !== todosOsTiposSanguineosSelecionados ? tiposSanguineosFormulario.selecionados.map(tipoSanguineo => tipoSanguineo.value) : []
    };
    if (busca.nome.length || busca.generos.length || busca.tipos_sanguineos.length) {
      callback(busca);
    }
  };

  return (
      <Dialog visible={visivel} onDismiss={cancelar}>
          <Dialog.Title>Como deseja buscar?</Dialog.Title>
          <Dialog.Content>
            <TextInput
              onChangeText={(nome) => setNome(nome.trim())}
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
}

export default Buscar;