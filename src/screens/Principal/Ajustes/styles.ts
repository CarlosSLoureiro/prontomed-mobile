import { StyleSheet } from "react-native";
import { isDarkModeScheme } from "@utils/ThemeScheme";

const getStyles = () => {
    const isDarkMode = isDarkModeScheme();
    
    return StyleSheet.create({
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