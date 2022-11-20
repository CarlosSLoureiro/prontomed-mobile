import { StyleSheet } from "react-native";
import { isDarkModeScheme } from "@utils/ThemeScheme";

const getStyles = () => {
    const isDarkMode = isDarkModeScheme();
    
    return StyleSheet.create({
        card: {
            borderWidth: 1,
            borderColor: "#000",
            backgroundColor: "#fff",
            borderRadius: 20,
            marginHorizontal: 5,
            marginTop: 10,
        },
        cardUltimo: {
            marginBottom: 150
        },
        data: {
            textAlign: 'center',
            flex: 1,
            alignSelf: 'center',
            position: 'absolute'
        },
        icone: {
            backgroundColor: '#404040',
        }
    });
}

export default getStyles;