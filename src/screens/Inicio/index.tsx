import React from "react";
import { Text, View } from "react-native";
import { Fontisto } from '@expo/vector-icons';
import styles from "./styles";

const Inicio = (): JSX.Element => {
    return (
    <View style={styles.root}>
      <Fontisto name="doctor" size={124} color="black" />
      <Text style={styles.text}>Bem-vindo ao ProntoMed!</Text>
    </View>
    )
}

export default Inicio;