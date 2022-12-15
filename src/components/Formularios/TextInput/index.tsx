import { useState } from 'react';
import { DarkTheme, DefaultTheme, TextInput as PaperTextInput } from 'react-native-paper';

import ThemeScheme from '@hooks/useThemeScheme';

import { TextInputContrato } from './types';

const TextInput = ({
  inputRef,
  nextInputRef,
  nome,
  icon,
  valor = '',
  telefone = false,
  keyboard = 'default',
  callback,
  onFocusIn,
  onFocusOut,
  style
}: TextInputContrato): JSX.Element => {
  const [input, setInput] = useState<string>(valor);
  const isDarkMode = ThemeScheme.isDarkModeScheme();

  const formatarTelefone = (texto: string): string => {
    return texto
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  };

  const formatarDecimal = (texto: string): string => {
    let str = texto.replaceAll(',', '.').replaceAll('.', '');

    const num = parseInt(str) / 100;
    if (!isNaN(num)) {
      str = String(num.toFixed(2));
    }

    return str.replace('.', ',');
  };

  return (
    <PaperTextInput
      ref={inputRef}
      theme={isDarkMode ? DarkTheme : DefaultTheme}
      style={style}
      label={nome}
      keyboardType={keyboard}
      onChangeText={(str: string) => {
        if (telefone) {
          str = formatarTelefone(str);
        }
        if (keyboard === 'decimal-pad') {
          str = formatarDecimal(str);
        }
        setInput(str);
        callback(str.trim() !== '' ? str.trim() : undefined);
      }}
      returnKeyType={nextInputRef && ['default', 'email-address'].includes(keyboard) ? 'next' : 'done'}
      returnKeyLabel={nextInputRef ? 'seguinte' : 'concluído'}
      onSubmitEditing={() => nextInputRef?.current?.focus()}
      onFocus={onFocusIn}
      onBlur={onFocusOut}
      value={input}
      mode="outlined"
      left={(icon !== undefined) ? <PaperTextInput.Icon icon={icon} color={isDarkMode ? 'white' : 'black'} /> : undefined}
    />
  );
};

export default TextInput;
