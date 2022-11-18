import { StyleSheet } from "react-native";
import { isDarkModeScheme } from "@utils/ThemeScheme";

const getStyles = () => {
    const isDarkMode = isDarkModeScheme();
    
    return StyleSheet.create({
        card: {
            borderWidth: 1,
            borderColor: "#555",
            backgroundColor: "#fff",
            borderRadius: 20,
            marginHorizontal: 5,
            marginVertical: 6,
            ultimo: {
                marginBottom: 130
            },
        },
        cardId: {
            position: "relative",
            alignItems: 'center',
            padding: 0,
            margin: 0,
            width: 40,
            height: 40,
            right: 0,
            opacity: 0.6,
            backgroundColor: "#000",
            borderRadius: 50,
            paragraph: {
                color: "#fff"
            }
        },
        data: {
            textAlign: 'center',
        },
        nome: {
            textAlign: 'center',
            lineHeight: 25,
            fontSize: 22
        },
        subtitle: {
            textAlign: 'center',
        }
    });
}

export default getStyles;