import { ColorValue, StyleSheet, useWindowDimensions } from 'react-native';

const getStyles = (
  possuiBotaoEsquerdo: boolean,
  corDeFundo: ColorValue
) => {
  const windowWidth = useWindowDimensions().width;
  const HEIGHT = windowWidth * 0.21;
  const FOOTER_PADDING = windowWidth * 0.1;

  return StyleSheet.create({
    rodape: {
      flexDirection: 'row',
      justifyContent: possuiBotaoEsquerdo ? 'space-between' : 'flex-end',
      height: HEIGHT,
      backgroundColor: corDeFundo,
      opacity: 0.6,
      alignItems: 'center',
      paddingHorizontal: FOOTER_PADDING
    }
  });
};

export default getStyles;
