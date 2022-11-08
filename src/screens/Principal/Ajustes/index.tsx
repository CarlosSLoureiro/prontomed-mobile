import React from 'react';
import { Text } from 'react-native';
import Icon from "react-native-dynamic-vector-icons";
import getStyles from "./styles";

const Ajustes = (): JSX.Element => {
    const styles = getStyles();
  
    return (
      <>
        <Icon type="SimpleLineIcons" name="settings" size={124} style={styles.icon} />
        <Text style={styles.text}>Ajustes!</Text>
      </>
    )
};

export default Ajustes;