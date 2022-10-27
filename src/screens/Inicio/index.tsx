import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import IconeMedico from "@components/Inicio/IconeMedico";

const Inicio = (): JSX.Element => {
    return (
    <View style={styles.root}>
      <IconeMedico />
      <Text style={styles.text}>Bem-vindo ao ProntoMed!</Text>
    </View>
    )
}

export default Inicio;