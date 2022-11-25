import { DatasContrato } from '@screens/Principal/Consultas/types';
import { FiltrarDatasContrato } from './types';
import { DatePickerModal, pt, registerTranslation } from 'react-native-paper-dates';

const FiltrarDatas = ({
  visivel,
  setVisivel,
  callback,
  valorAtual
}: FiltrarDatasContrato): JSX.Element => {
  const cancelar = (): void => setVisivel(false);
  const filtrar = (datas: DatasContrato): void => {
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
          const datas: DatasContrato = {
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
