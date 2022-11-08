import React from 'react';
import { Text } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import getStyles from "./styles";

const Ajustes = (): JSX.Element => {
    const styles = getStyles();
  
    return (
      <>
        <Octicons name="home" size={124} style={styles.icon} />
        <Text style={styles.text}>Ajustes!</Text>
      </>
    )
};

export default Ajustes;