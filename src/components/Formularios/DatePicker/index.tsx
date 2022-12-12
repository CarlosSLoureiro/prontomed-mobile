import { useState } from 'react';
import { DarkTheme, DefaultTheme, TextInput as PaperTextInput } from 'react-native-paper';
import { DatePickerModal, pt, registerTranslation } from 'react-native-paper-dates';

import ThemeScheme from '@hooks/useThemeScheme';

import { DatePickerContrato } from './types';

import moment from 'moment';

const DatePicker = ({
  nome,
  valor,
  callback,
  style
}: DatePickerContrato): JSX.Element => {
  const [visivel, setVisivel] = useState(false);
  const [data, setData] = useState<Date | undefined>(valor);

  const isDarkMode = ThemeScheme.isDarkModeScheme();

  const abrir = (): void => setVisivel(true);
  const fechar = (): void => setVisivel(false);

  registerTranslation('pt', pt);

  return (
    <>
        <PaperTextInput
            theme={isDarkMode ? DarkTheme : DefaultTheme}
            style={style}
            label={nome}
            value={data ? moment(data).format('DD/MM/YYYY') : undefined}
            mode="outlined"
            onPressIn={abrir}
            left={<PaperTextInput.Icon icon={'calendar'} color={isDarkMode ? 'white' : 'black'} />}
        />
        <DatePickerModal
            locale="pt"
            mode="single"
            visible={visivel}
            onDismiss={(fechar)}
            date={data ?? new Date()}
            onConfirm={params => {
              setData(params.date as Date);
              fechar();
              if (data !== undefined) {
                callback(data);
              }
            }}
            uppercase={false}
            label={nome}
            saveLabel="Salvar"
        />
    </>
  );
};

export default DatePicker;
