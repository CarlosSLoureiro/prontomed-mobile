
import React, { useState } from "react";
/* @ts-ignore */
import { BottomMenu, Item as MenuItem } from "react-native-bottom-menu";
import { MenuContrato } from "./contratos";
import getStyles from "./styles";

const items = [
  {
    title: "Início",
    page: 1,
    icon: {
      font: "Octicons",
      name: "home",
    }
  },
  {
    title: "Consultas",
    page: 2,
    icon: {
      font: "FontAwesome",
      name: "calendar-check-o",
    }
  },
  {
    title: "Pacientes",
    page: 3,
    icon: {
      font: "Entypo",
      name: "users",
    }
  },
  {
    title: "Ajustes",
    page: 4,
    icon: {
      font: "SimpleLineIcons",
      name: "settings",
    }
  },
];

const Menu = ({alterarPagina}:MenuContrato) : JSX.Element => {
  const [pagina, setPagina] = useState(0);
  const styles = getStyles();

  return (
    <BottomMenu shadowStyle={styles.menu.shadow} backgroundColor={styles.menu.backgroundColor}>
      {
        items.map((item, index) => <MenuItem
          key={index}
          styles={styles.item}
          text={item.title}
          type={item.icon.font}
          name={item.icon.name}
          activeColor={styles.item.activeColor}
          inactiveColor={styles.item.inactiveColor}
          size={22}
          isActive={pagina === (item.page - 1)}
          onPress={() => setPagina(alterarPagina(item.page - 1))}
        />)
      }
    </BottomMenu>
  );
};

export default Menu;