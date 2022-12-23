import { useState } from 'react';
import { Button, Dialog, Divider, RadioButton } from 'react-native-paper';

import { OrdenacaoConsultasContrato, ValoresDeBusca, ValoresDeOrdem } from '@repository/Consultas/types';

import { OrdenarContrato } from './types';

const Ordenar = ({
  visivel,
  setVisivel,
  callback,
  valorAtual
}: OrdenarContrato): JSX.Element => {
  const [ordem, setOrdem] = useState(valorAtual.ordem);
  const [chave, setChave] = useState(valorAtual.chave);

  const cancelar = (): void => {
    setVisivel(false);
    setOrdem(valorAtual.ordem);
    setChave(valorAtual.chave);
  };

  const ordenar = (): void => {
    setVisivel(false);
    const ordenacao: OrdenacaoConsultasContrato = {
      ordem,
      chave
    };
    callback(ordenacao);
  };

  return (
      <Dialog visible={visivel} onDismiss={cancelar}>
        <Dialog.Title>Como deseja ordernar?</Dialog.Title>
        <Dialog.Content>
          <RadioButton.Group onValueChange={valor => setOrdem(valor as ValoresDeOrdem)} value={ordem}>
            <RadioButton.Item label="Em ordem crescente (A-Z)" value="crescente" />
            <RadioButton.Item label="Em ordem decrescente (Z-A)" value="decrescente" />
          </RadioButton.Group>
          <Divider/>
          <RadioButton.Group onValueChange={valor => setChave(valor as ValoresDeBusca)} value={chave}>
          <RadioButton.Item label="Pela data de agendamento" value="data" />
            <RadioButton.Item label="Pelo número da consulta" value="id" />
            <RadioButton.Item label="Pelo nome do paciente" value="nome" />
          </RadioButton.Group>
        </Dialog.Content>
        <Dialog.Actions>
          <Button color='#000000' onPress={ordenar}>Ordenar</Button>
          <Button color='#000000' onPress={cancelar}>Cancelar</Button>
        </Dialog.Actions>
      </Dialog>
  );
};

export default Ordenar;
