import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import MenuContexto from '@components/MenuContexto';

import getStyles from './styles';

import { ObsMensagemContrato } from './types';

import moment from 'moment';

const ObsMensagem = ({
  observacao,
  editarObservacaoRef,
  excluirObservacaoRef
}: ObsMensagemContrato): JSX.Element => {
  const styles = getStyles();
  const [exibirMenu, setExibirMenu] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });

  const abrirMenu = (): void => setExibirMenu(true);
  const fecharMenu = (): void => setExibirMenu(false);

  const abrirMenuContexto = (event: { nativeEvent: any }): void => {
    const { nativeEvent } = event;
    const anchor = {
      x: nativeEvent.pageX,
      y: nativeEvent.pageY
    };

    setMenuAnchor(anchor);
    abrirMenu();
  };

  return (
    <>
      <View style={styles.mensagem}>
        <TouchableOpacity
          onPress={abrirMenuContexto}
        >
          <View style={styles.fundo}>
              <View style={styles.seta}></View>
              <Text style={styles.texto} >{ observacao.mensagem }</Text>
          </View>
        </TouchableOpacity>
          <Text style={styles.data}>{ moment(observacao.dataCriacao).format('DD/MM/YYYY [as] HH[h]mm') }</Text>
      </View>
      <MenuContexto
        visivel={exibirMenu}
        {...{ fecharMenu, menuAnchor }}
        items={[
          {
            titulo: 'Editar',
            icone: 'file-edit',
            callback: () => {
              editarObservacaoRef.current?.abrirDialog(observacao);
              fecharMenu();
            }
          },
          {
            titulo: 'Excluir',
            icone: 'file-remove',
            callback: () => {
              excluirObservacaoRef.current?.abrirDialog(observacao);
              fecharMenu();
            }
          }
        ]}
      />
    </>
  );
};

export default ObsMensagem;
