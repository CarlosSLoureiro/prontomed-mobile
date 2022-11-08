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
        }
    });
}

export default getStyles;