import { Menu } from 'react-native-paper';

import { ConsultaMenuContrato } from './types';

const MenuContexto = ({
  visivel,
  fecharMenu,
  menuAnchor,
  items
}: ConsultaMenuContrato): JSX.Element => {
  return (
        <Menu
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
