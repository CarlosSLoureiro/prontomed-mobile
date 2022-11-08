import { StyleSheet } from "react-native";
import { isDarkModeScheme } from "@utils/ThemeScheme";

const getStyles = () => {
    const isDarkMode = isDarkModeScheme();
    
    return StyleSheet.create({
        root: {
            flex: 1, 
            backgroundColor: isDarkMode ? "black" : "white"
        },
        content: {
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            paddingBottom: 130,
        },
        menu: {
            bottom: 30
        },
        text: {
            fontSize: 24,
            paddingTop: 20,
            color: isDarkMode ? "white" : "black"
        },
        icon: {
            color: isDarkMode ? "white" : "black"
        }
    });
}

export default getStyles;