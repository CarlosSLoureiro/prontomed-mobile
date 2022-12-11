import { StyleSheet } from 'react-native';

import { Generos } from '@entity/Paciente/enums';

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
    }
  });
};

export default getStyles;
