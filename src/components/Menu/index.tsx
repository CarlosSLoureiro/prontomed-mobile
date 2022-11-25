
import { useState, useEffect } from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
/* @ts-expect-error - por algum motivo a importação da biblioteca abaixo causa erro no editor */
import { BottomMenu, Item as MenuItem } from 'react-native-bottom-menu';
import { MenuContrato } from './types';
import getStyles from './styles';
import items from './items';

const Menu = ({ alterarPagina }: MenuContrato): JSX.Element => {
  const [pagina, setPagina] = useState(items[0]);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const styles = getStyles();

  useEffect(() => {
    alterarPagina(pagina.page);
    navigation.setOptions({
      headerTitle: pagina.title
    });
  });

  return (
    <BottomMenu shadowStyle={styles.menu.shadow} backgroundColor={styles.menu.backgroundColor}>
      {
        items.map((item, index) => <MenuItem
          key={index}
          styles={styles.item}
          text={item.nome}
          type={item.icon.font}
          name={item.icon.name}
          activeColor={styles.item.activeColor}
          inactiveColor={styles.item.inactiveColor}
          size={22}
          isActive={pagina.page === item.page}
          onPress={() => {
            setPagina(item);
          }}
        />)
      }
    </BottomMenu>
  );
};

export default Menu;
