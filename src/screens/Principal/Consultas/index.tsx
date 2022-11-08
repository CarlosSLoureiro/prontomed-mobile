import React from 'react';
import { Text } from 'react-native';
import Icon from "react-native-dynamic-vector-icons";
import getStyles from "./styles";

const Consultas = (): JSX.Element => {
    const styles = getStyles();
  
    return (
      <>
        <Icon type="FontAwesome" name="calendar-check-o" size={124} style={styles.icon} />
        <Text style={styles.text}>Consultas!</Text>
      </>
    )
};

export default Consultas;