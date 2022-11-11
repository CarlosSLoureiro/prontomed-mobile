import { StyleSheet } from "react-native";
import { isDarkModeScheme } from "@utils/ThemeScheme";

const getStyles = () => {
    const isDarkMode = isDarkModeScheme();
    
    return StyleSheet.create({
        root: {
            flex: 1, 
            backgroundColor: isDarkMode ? "#111" : "#eee"
        },
        conteudo: {
            flexGrow: 1,
            minHeight: '100%'
        },
        menu: {
            bottom: 30
        },
        text: {
            fontSize: 24,
            paddingTop: 20,
            alignSelf: 'center',
            color: isDarkMode ? "white" : "black"
        },
        icon: {
            alignSelf: 'center',
            color: isDarkMode ? "white" : "black"
        }
    });
}

export default getStyles;