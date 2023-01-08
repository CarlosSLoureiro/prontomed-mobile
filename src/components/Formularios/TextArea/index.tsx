import { useState } from 'react';
import { DarkTheme, DefaultTheme, TextInput as PaperTextInput } from 'react-native-paper';

import ThemeScheme from '@utils/ThemeScheme';

import { TextAreaContrato } from './types';

const TextArea = ({
  inputRef,
  nextInputRef,
  focar,
  nome,
  valor = '',
  callback,
  onFocusIn,
  onFocusOut,
  style
}: TextAreaContrato): JSX.Element => {
  const [input, setInput] = useState<string>(valor);
  const isDarkMode = ThemeScheme.isDarkModeScheme();

  return (
    <PaperTextInput
      ref={inputRef}
      multiline={true}
      numberOfLines={4}
      theme={isDarkMode ? DarkTheme : DefaultTheme}
      style={style}
      label={nome}
      onChangeText={(str: string) => {
        setInput(str);
        callback(str.trim() !== '' ? str.trim() : undefined);
      }}
      onSubmitEditing={() => nextInputRef?.current?.focus()}
      autoFocus={focar}
      onFocus={onFocusIn}
      onBlur={onFocusOut}
      value={input}
      mode="outlined"
    />
  );
};

export default TextArea;
