import { useState } from 'react';
import { DarkTheme, DefaultTheme, TextInput as PaperTextInput } from 'react-native-paper';

import ThemeScheme from '@hooks/useThemeScheme';

import { TextInputContrato } from './types';

const TextInput = ({
  nome,
  icon,
  valor = '',
  callback,
  style
}: TextInputContrato): JSX.Element => {
  const [input, setInput] = useState<string>(valor);
  const isDarkMode = ThemeScheme.isDarkModeScheme();

  return (
    <PaperTextInput
      theme={isDarkMode ? DarkTheme : DefaultTheme}
      style={style}
      label={nome}
      onChangeText={(str: string) => {
        setInput(str);
        callback(str.trim());
      }}
      value={input}
      mode="outlined"
      left={(icon !== undefined) ? <PaperTextInput.Icon icon={icon} color={isDarkMode ? 'white' : 'black'} /> : undefined}
    />
  );
};

export default TextInput;
