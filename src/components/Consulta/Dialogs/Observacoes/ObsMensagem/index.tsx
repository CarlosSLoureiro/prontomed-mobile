import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import MenuContexto from '@components/MenuContexto';

import getStyles from './styles';

import { ObsMensagemContrato } from './types';

import moment from 'moment';

const ObgMensagem = ({
  observacao
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
      <TouchableOpacity
        onPress={abrirMenuContexto}
      >
        <View style={styles.mensagem}>
          <View style={styles.fundo}>
              <View style={styles.seta}></View>
              <Text style={styles.texto} >{ observacao.mensagem }</Text>
          </View>
          <Text style={styles.data}>{ moment(observacao.data).format('DD/MM/YYYY [as] HH[h]mm') }</Text>
        </View>
      </TouchableOpacity>
      <MenuContexto
        visivel={exibirMenu}
        {...{ fecharMenu, menuAnchor }}
        items={[
          {
            titulo: 'Editar',
            icone: 'file-edit',
            callback: () => {
              fecharMenu();
            }
          },
          {
            titulo: 'Excluir',
            icone: 'file-remove',
            callback: () => {
              fecharMenu();
            }
          }
        ]}
      />
    </>
  );
};

export default ObgMensagem;
