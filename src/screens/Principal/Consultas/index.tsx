import React from 'react';
import { Text } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import getStyles from "./styles";

const Consultas = (): JSX.Element => {
    const styles = getStyles();
  
    return (
      <>
        <Octicons name="home" size={124} style={styles.icon} />
        <Text style={styles.text}>Consultas!</Text>
      </>
    )
};

export default Consultas;