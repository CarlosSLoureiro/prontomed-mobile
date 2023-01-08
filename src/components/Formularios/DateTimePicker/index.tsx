import { useState } from 'react';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { DatePickerModal, pt, registerTranslation, TimePickerModal } from 'react-native-paper-dates';

import ThemeScheme from '@utils/ThemeScheme';

import { DateTimePickerContrato } from './types';

import moment from 'moment';

const DateTimePicker = ({
  inputRef,
  nextInputRef,
  nome,
  valor,
  callback,
  style
}: DateTimePickerContrato): JSX.Element => {
  const [dataVisivel, setDataVisivel] = useState(false);
  const [horaVisivel, setHoraVisivel] = useState(false);
  const [data, setData] = useState<Date | undefined>(valor);

  const agora = new Date();

  const isDarkMode = ThemeScheme.isDarkModeScheme();

  const abrirData = (): void => setDataVisivel(true);
  const fecharData = (): void => {
    setData(valor);
    setDataVisivel(false);
  };
  const abrirHora = (): void => setHoraVisivel(true);
  const fecharHora = (): void => {
    setData(valor);
    setHoraVisivel(false);
  };

  const atualizarData = (params): void => {
    const dataSelecionada = params.date as Date;
    setData(dataSelecionada);
    setDataVisivel(false);
    abrirHora();
  };

  const atualizarHora = (params): void => {
    const dataAgendada = data !== undefined ? new Date(data.getTime()) : new Date();
    dataAgendada.setHours(params.hours as number, params.minutes as number, 0, 0);
    valor = dataAgendada;
    setData(dataAgendada);
    callback(dataAgendada);
    setHoraVisivel(false);
    nextInputRef?.current?.focus();
  };

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
            value={data ? moment(data).format('DD/MM/YYYY [as] HH[h]mm') : ''}
            mode="outlined"
            onFocus={abrirData}
            left={<PaperTextInput.Icon icon={'calendar'} color={isDarkMode ? '#b5b5b5' : '#4a4a4a'} />}
        />
        <DatePickerModal
            locale="pt"
            mode="single"
            visible={dataVisivel}
            onDismiss={fecharData}
            date={data ?? new Date()}
            onConfirm={atualizarData}
            uppercase={true}
            animationType="slide"
            label={nome}
            saveLabel="Salvar"
        />
        <TimePickerModal
          locale="pt"
          visible={horaVisivel}
          onDismiss={fecharHora}
          onConfirm={atualizarHora}
          hours={valor?.getHours() ?? agora.getHours()}
          minutes={valor?.getMinutes() ?? agora.getMinutes()}
          label="Selecione o horário"
          uppercase={true}
          cancelLabel="Cancelar"
          confirmLabel="Salvar"
          animationType="slide"
        />
    </>
  );
};

export default DateTimePicker;
