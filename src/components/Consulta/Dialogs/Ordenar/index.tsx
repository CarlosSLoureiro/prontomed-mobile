import React, { useState } from "react";
import { Dialog, RadioButton, Divider, Button } from "react-native-paper";
import { OrdenarContrato, ItemsSelecionados } from "./types";

const Ordenar = ({
    visivel,
    setVisivel,
    callback
}:OrdenarContrato) => {
    const [ ordem, setOrdem ] = useState("decrescente");
    const [ chave, setChave ] = useState("data");

    const fechar = () => setVisivel(false);
    const ordenar = () => {
        fechar();
        callback({
            ordem,
            chave
        } as ItemsSelecionados);
    };

    return (
        <Dialog visible={visivel} onDismiss={fechar}>
            <Dialog.Title>Como deseja ordernar?</Dialog.Title>
            <Dialog.Content>
              <RadioButton.Group onValueChange={valor => setOrdem(valor)} value={ordem}>
                <RadioButton.Item label="Em ordem crescente (A-Z)" value="crescente" />
                <RadioButton.Item label="Em ordem decrescente (Z-A)" value="decrescente" />
              </RadioButton.Group>
              <RadioButton.Group onValueChange={valor => setChave(valor)} value={chave}>
              <RadioButton.Item label="Pela data de agendamento" value="data" />
                <RadioButton.Item label="Pelo número da consulta" value="id" />
                <RadioButton.Item label="Pelo nome do paciente" value="nome" />
              </RadioButton.Group>
              <Divider/>
            </Dialog.Content>
            <Dialog.Actions>
              <Button color='#000000' onPress={ordenar}>Ordenar</Button>
              <Button color='#000000' onPress={fechar}>Cancelar</Button>
            </Dialog.Actions>
          </Dialog>
    );
}

export default Ordenar;