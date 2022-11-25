import { ColorValue, StyleSheet } from 'react-native';

const getStyles = (
  corDeFundo: ColorValue
) => {
  return StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: corDeFundo
    },
    tituloRoot: {
      marginTop: 16
    },
    titulo: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white'
    }
  });
};

export default getStyles;
