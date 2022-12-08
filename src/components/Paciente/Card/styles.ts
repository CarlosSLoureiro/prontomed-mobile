import { StyleSheet } from 'react-native';

import { Generos } from '@entity/paciente/enums';

import ThemeScheme from '@hooks/useThemeScheme';

const getStyles = () => {
  const isDarkMode = ThemeScheme.isDarkModeScheme();

  return StyleSheet.create({
    card: {
      backgroundColor: '#ffffff',
      marginHorizontal: 4,
      marginVertical: 8,
      alignSelf: 'center',
      ultimo: {
        marginBottom: 130
      },
      icon: (genero: Generos) => {
        switch (genero) {
          case Generos.MASCULINO:
            return {
              name: 'male',
              type: 'Fontisto',
              color: '#545454',
              backgrounColor: '#cce2ff'
            };
          case Generos.FEMININO:
            return {
              name: 'female',
              type: 'Fontisto',
              color: '#545454',
              backgrounColor: '#feccff'
            };
          default:
            return {
              name: 'user',
              type: 'FontAwesome',
              color: '#545454',
              backgrounColor: '#fffdcc'
            };
        }
      }
    },
    cardId: {
      position: 'relative',
      alignItems: 'center',
      padding: 0,
      margin: 0,
      width: 40,
      height: 40,
      right: 0,
      opacity: 0.6,
      backgroundColor: '#000',
      borderRadius: 50,
      paragraph: {
        color: '#fff'
      }
    },
    data: {
      textAlign: 'center'
    },
    nome: {
      textAlign: 'center',
      lineHeight: 25,
      fontSize: 22
    },
    subtitle: {
      textAlign: 'center'
    }
  });
};

export default getStyles;
