import { useState } from 'react';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { DatePickerModal, pt, registerTranslation } from 'react-native-paper-dates';

import ThemeScheme from '@utils/ThemeScheme';

import { DatePickerContrato } from './types';

import moment from 'moment';

const DatePicker = ({
  inputRef,
  nextInputRef,
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
            ref={inputRef}
            theme={ThemeScheme.getTheme()}
            style={style}
            label={nome}
            showSoftInputOnFocus={false}
            onChangeText={(str: string) => {
              // evita que o usuário altere o texto do input
              if (data !== undefined) {
                setData(new Date(data.getTime()));
              } else {
                setData(undefined);
              }
            }}
            value={data ? moment(data).format('DD/MM/YYYY') : ''}
            mode="outlined"
            onFocus={abrir}
            left={<PaperTextInput.Icon icon={'calendar'} color={isDarkMode ? '#b5b5b5' : '#4a4a4a'} />}
        />
        <DatePickerModal
            locale="pt"
            mode="single"
            visible={visivel}
            onDismiss={fechar}
            date={data ?? new Date()}
            onConfirm={params => {
              const dataSelecionada = params.date as Date;
              setData(dataSelecionada);
              callback(dataSelecionada);
              fechar();
              nextInputRef?.current?.focus();
            }}
            uppercase={true}
            animationType="slide"
            label={nome}
            saveLabel="Salvar"
        />
    </>
  );
};

export default DatePicker;
