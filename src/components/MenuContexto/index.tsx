import { Menu, useTheme } from 'react-native-paper';

import { MenuContextoContrato } from './types';

const MenuContexto = ({
  visivel,
  fecharMenu,
  menuAnchor,
  items
}: MenuContextoContrato): JSX.Element => {
  const theme = useTheme();

  return (
        <Menu
            theme={theme}
            visible={visivel}
            onDismiss={fecharMenu}
            anchor={menuAnchor}
        >
            {
                items.map((item, index) => <Menu.Item key={index} onPress={item.callback} title={item.titulo} icon={item.icone} />)
            }
        </Menu>
  );
};

export default MenuContexto;
