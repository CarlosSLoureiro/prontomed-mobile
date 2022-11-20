import React, { useState } from "react";
import { Dialog, TextInput, Divider, Button } from "react-native-paper";
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

    return (
        <Dialog visible={visivel} onDismiss={cancelar}>
            <Dialog.Title>Como deseja buscar?</Dialog.Title>
            <Dialog.Content>
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