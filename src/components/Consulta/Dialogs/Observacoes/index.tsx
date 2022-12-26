import { useRef, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Dialog, Divider, Text } from 'react-native-paper';

import Consulta from '@entity/Consulta';

import Mensagem from './mensagem';
import getStyles from './styles';

import { ExibirObservacoesContrato } from './types';

const Observacoes = ({
  visivel,
  setVisivel,
  formularioRef,
  callback
}: ExibirObservacoesContrato): JSX.Element => {
  const styles = getStyles();
  const [consulta, setConsulta] = useState<Consulta | undefined>();
  const scrollRef = useRef<ScrollView>(null);

  const abrirDialog = (consulta: Consulta): void => {
    setVisivel(true);
    setConsulta(consulta);
  };

  if (formularioRef !== undefined) {
    formularioRef.current = {
      abrirDialog
    };
  }

  const fechar = (): void => {
    setVisivel(false);
  };

  return (
      <Dialog visible={visivel} onDismiss={fechar} style={styles.dialog}>
        <Dialog.Title>Obs. da consulta Nº { consulta?.id }</Dialog.Title>
        {
          consulta?.observacoes !== undefined && consulta.observacoes?.length > 0
            ? (
              <ScrollView
                ref={scrollRef}
                onContentSizeChange={() => scrollRef?.current?.scrollToEnd({ animated: false })}
              >
                {
                  consulta?.observacoes.map((observacao, index) => <Mensagem
                    key={index}
                    observacao={observacao}
                  />)
                }
              </ScrollView>
              )
            : (
              <Dialog.Content>
                <Text style={styles.text}>Nao há observações</Text>
              </Dialog.Content>
              )
        }
        <Divider/>
        <Dialog.Actions>
          <Button labelStyle={styles.dialog.botoes} onPress={fechar}>Fechar</Button>
          <Button labelStyle={styles.dialog.botoes} onPress={() => { console.log('nova obs'); }}>Nova observação</Button>
        </Dialog.Actions>
        </Dialog>
  );
};

export default Observacoes;
