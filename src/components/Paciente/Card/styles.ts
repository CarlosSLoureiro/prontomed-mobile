import { StyleSheet } from 'react-native';

import { Generos } from '@entity/Paciente/enums';

import ThemeScheme from '@utils/ThemeScheme';

const getStyles = () => {
  const isDarkMode = ThemeScheme.isDarkModeScheme();

  return StyleSheet.create({
    card: {
      backgroundColor: isDarkMode ? '#000' : '#fff',
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
              color: isDarkMode ? '#b1b1b1' : '#545454',
              backgrounColor: isDarkMode ? '#34455a' : '#cce2ff'
            };
          case Generos.FEMININO:
            return {
              name: 'female',
              type: 'Fontisto',
              color: isDarkMode ? '#b1b1b1' : '#545454',
              backgrounColor: isDarkMode ? '#57325a' : '#feccff'
            };
          default:
            return {
              name: 'user',
              type: 'FontAwesome',
              color: isDarkMode ? '#b1b1b1' : '#545454',
              backgrounColor: isDarkMode ? '#5d5a2c' : '#fffdcc'
            };
        }
      }
    }
  });
};

export default getStyles;
