import React from "react";
import { Text, View } from "react-native";
import { Fontisto } from '@expo/vector-icons';
import getStyles from "./styles";

const Inicio = (): JSX.Element => {
  const styles = getStyles();

  return (
    <View style={styles.root}>
      <Fontisto name="doctor" size={124} style={styles.icon} />
      <Text style={styles.text}>Página inicial do ProntoMed!</Text>
    </View>
  )
}

export default Inicio;