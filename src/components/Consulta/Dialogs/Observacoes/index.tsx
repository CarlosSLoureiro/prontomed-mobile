import { useRef, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Dialog, Divider, Text } from 'react-native-paper';

import Consulta from '@entity/Consulta';
import Observacao from '@entity/Observacao';

import CadastrarEditarObservacao from './CadastrarEditar';
import Excluir from './Excluir';
import ObsMensagem from './ObsMensagem';
import getStyles from './styles';

import { ExibirObservacoesContrato } from './types';

const Observacoes = ({
  visivel,
  setVisivel,
  formularioRef,
  callbackObservar,
  callbackExcluir
}: ExibirObservacoesContrato): JSX.Element => {
  const styles = getStyles();
  const [consulta, setConsulta] = useState<Consulta | undefined>();
  const [cadastrarEditarVisivel, setCadastrarEditarVisivel] = useState(false);
  const [excluirVisivel, setExcluirVisivel] = useState(false);
  const editarObservacaoRef = useRef<any>();
  const excluirObservacaoRef = useRef<any>();
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

  const observar = async (observacao: Partial<Observacao>): Promise<Observacao | undefined> => {
    if (consulta !== undefined) {
      return await callbackObservar(consulta, observacao);
    }
  };

  const excluir = async (observacao: Observacao): Promise<Observacao | undefined> => {
    if (consulta !== undefined && observacao !== undefined) {
      return await callbackExcluir(consulta, observacao);
    }
  };

  return (
    <>
      <Dialog visible={visivel} onDismiss={fechar} style={styles.dialog}>
        <Dialog.Title>Obs. da consulta Nº { consulta?.id }</Dialog.Title>
        {
          consulta?.observacoes !== undefined && consulta.observacoes?.length > 0
            ? (
              <ScrollView
                ref={scrollRef}
                onContentSizeChange={() => scrollRef?.current?.scrollToEnd({ animated: true })}
              >
                {
                  consulta?.observacoes.map((observacao, index) => <ObsMensagem
                    key={index}
                    observacao={observacao}
                    editarObservacaoRef={editarObservacaoRef}
                    excluirObservacaoRef={excluirObservacaoRef}
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
          <Button labelStyle={styles.dialog.botoes} onPress={() => setCadastrarEditarVisivel(true) }>Nova observação</Button>
        </Dialog.Actions>
      </Dialog>
      <CadastrarEditarObservacao
        visivel={cadastrarEditarVisivel}
        setVisivel={setCadastrarEditarVisivel}
        formularioRef={editarObservacaoRef}
        callback={observar}
      />
      <Excluir
        visivel={excluirVisivel}
        setVisivel={setExcluirVisivel}
        formularioRef={excluirObservacaoRef}
        callback={excluir}
      />
    </>
  );
};

export default Observacoes;
