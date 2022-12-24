import { useEffect, useState } from 'react';
import { FAB } from 'react-native-paper';

import { MenuBotao, MenuOpcoesContrato } from './types';

const MenuOpcoes = ({
  visivel,
  botoes
}: MenuOpcoesContrato): JSX.Element => {
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
            style={{
              paddingBottom: 100,
              marginRight: -10
            }}
            fabStyle={{
              backgroundColor: '#fff'
            }}
            icon={aberto ? 'calendar-account-outline' : 'plus'}
            actions={menuBotoes}
            onStateChange={({ open }) => setAberto(open)}
        />
  );
};

export default MenuOpcoes;
