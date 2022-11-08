import React from 'react';
import { Text } from 'react-native';
import Icon from "react-native-dynamic-vector-icons";
import getStyles from "./styles";

const Pacientes = (): JSX.Element => {
    const styles = getStyles();
  
    return (
      <>
        <Icon type="Entypo" name="users" size={124} style={styles.icon} />
        <Text style={styles.text}>Pacientes!</Text>
      </>
    )
};

export default Pacientes;