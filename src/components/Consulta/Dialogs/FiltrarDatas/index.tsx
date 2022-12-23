import { DatePickerModal, pt, registerTranslation } from 'react-native-paper-dates';

import { DatasConsultasContrato } from '@repository/Consultas/types';

import { FiltrarDatasContrato } from './types';

const FiltrarDatas = ({
  visivel,
  setVisivel,
  callback,
  valorAtual
}: FiltrarDatasContrato): JSX.Element => {
  const cancelar = (): void => setVisivel(false);
  const filtrar = (datas: DatasConsultasContrato): void => {
    cancelar();
    callback(datas);
  };

  registerTranslation('pt', pt);

  return (
      <DatePickerModal
        locale="pt"
        mode="range"
        visible={visivel}
        onDismiss={cancelar}
        startDate={valorAtual?.inicio}
        endDate={valorAtual?.fim}
        onConfirm={(params) => {
          const datas: DatasConsultasContrato = {
            inicio: params.startDate as Date,
            fim: params.endDate as Date
          };
          filtrar(datas);
        }}
        uppercase={false}
        startLabel="Inicio"
        endLabel="Fim"
        saveLabel="Filtrar"
      />
  );
};

export default FiltrarDatas;
