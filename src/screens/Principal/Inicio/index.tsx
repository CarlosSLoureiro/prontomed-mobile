import React from 'react';
import { Text } from 'react-native';
import Icon from "react-native-dynamic-vector-icons";
import getStyles from "./styles";

const Inicio = (): JSX.Element => {
    const styles = getStyles();
  
    return (
      <>
        <Icon type="Octicons" name="home" size={124} style={styles.icon} />
        <Text style={styles.text}>Início!</Text>
      </>
    )
};

export default Inicio;