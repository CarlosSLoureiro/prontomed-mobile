import { useEffect, useState } from 'react';
import { FAB } from 'react-native-paper';

import getStyles from './styles';

import { MenuBotao, MenuOpcoesContrato } from './types';

const MenuOpcoes = ({
  visivel,
  botoes
}: MenuOpcoesContrato): JSX.Element => {
  const styles = getStyles();
  const [aberto, setAberto] = useState(false);

  const [menuBotoes, setMenuBotoes] = useState<MenuBotao>([]);

  useEffect(() => {
    const menuBotoesArr: MenuBotao = [];

    botoes.forEach(botao => {
      if (botao.visivel) {
        menuBotoesArr.push({
          icon: botao.icon,
          label: botao.nome,
          onPress: botao.callback
        });
      }

      setMenuBotoes(menuBotoesArr);
    });
  }, [botoes]);

  return (
        <FAB.Group
            visible={visivel}
            open={aberto}
            style={styles.container}
            fabStyle={styles.fab}
            backdropColor={styles.fab.shadowColor}
            icon={aberto ? 'calendar-account-outline' : 'plus'}
            actions={menuBotoes}
            onStateChange={({ open }) => setAberto(open)}
        />
  );
};

export default MenuOpcoes;
