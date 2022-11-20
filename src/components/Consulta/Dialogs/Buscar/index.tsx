import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Dialog, TextInput, Divider, Button, Menu } from "react-native-paper";
import { PaperSelect } from "react-native-paper-select";
import { BuscarContrato, BuscarEntreDatasContrato, BuscarGenerosContrato, ListagemDeGenerosContrato } from "./types";

const Buscar = ({
    visivel,
    setVisivel,
    callback
}:BuscarContrato) => {
  const cancelar = () => setVisivel(false);
  const buscar = () => {
    const busca = {
      nome: null,
      generos: generos.valor !== todosOsGenerosSelecionados ? generos.valor : null
    }
    console.log(
      'Busca: ',
      busca 
    );
    //cancelar();
    //callback();
  };

  const todosOsGenerosSelecionados = 'Todos os gêneros';
  const listagemDeGeneros:Array<ListagemDeGenerosContrato> = [
      { _id: '1', value: 'Masculino' },
      { _id: '2', value: 'Feminino' },
      { _id: '3', value: 'Outro' }
  ]
  const [generos, setGeneros] = useState<BuscarGenerosContrato>({
    valor: todosOsGenerosSelecionados,
    listagem: listagemDeGeneros,
    selecionados: listagemDeGeneros,
  });
  const selecionarGenero = (value: any) => {
    if (value.selectedList.length > 0) {
      setGeneros({
        ...generos,
        valor: (value.selectedList.length === listagemDeGeneros.length) ? todosOsGenerosSelecionados : value.text,
        selecionados: value.selectedList
      });
    } else {
      setGeneros({
        ...generos,
        valor: todosOsGenerosSelecionados,
        selecionados: listagemDeGeneros,
      });
    }
  }

  return (
      <Dialog visible={visivel} onDismiss={cancelar}>
          <Dialog.Title>Como deseja buscar?</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              label="Nome do paciente"
              left={<TextInput.Icon icon="account" />}
            />
            <PaperSelect
              hideSearchBox={true}
              label="Selecione o gênero"
              modalCloseButtonText="Cancelar"
              modalDoneButtonText="Selecionar"
              value={generos.valor}
              onSelection={selecionarGenero}
              arrayList={[...generos.listagem]}
              selectedArrayList={[...generos.selecionados]}
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