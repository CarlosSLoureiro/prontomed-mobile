import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Dialog, TextInput, Divider, Button, Menu } from "react-native-paper";
import { BuscarContrato, BuscarEntreDatasContrato } from "./types";

const Buscar = ({
    visivel,
    setVisivel,
    callback
}:BuscarContrato) => {
  const cancelar = () => setVisivel(false);
  const buscar = () => {
      cancelar();
      callback();
  };

  const [buscarPor, setBuscarPor] = useState('nome'); 
  const [exibirMenu, setExibirMenu] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });

  const abrirMenuContexto = (event: { nativeEvent: any; }) => {
    const { nativeEvent } = event;
    const anchor = {
      x: nativeEvent.pageX,
      y: nativeEvent.pageY,
    };

    setMenuAnchor(anchor);
    setExibirMenu(true);
  }

  return (
      <Dialog visible={visivel} onDismiss={cancelar}>
          <Dialog.Title>Como deseja buscar?</Dialog.Title>
          <Dialog.Content>
            <TouchableOpacity activeOpacity={0.7} onPress={abrirMenuContexto}>
              <Button uppercase={false} icon="text-search" mode="contained">
                Tipo de busca: {buscarPor}
              </Button>
            </TouchableOpacity>
            <Menu
                visible={exibirMenu}
                onDismiss={() => setExibirMenu(false)}
                anchor={menuAnchor}
            >
              <Menu.Item onPress={() => setBuscarPor('nome')} title='nome' />
            </Menu>
            <TextInput
              mode="outlined"
              label="Nome do paciente"
              left={<TextInput.Icon icon="account" />}
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