import { DatasContrato } from "@screens/Principal/Consultas/types";
import { FiltrarDatasContrato } from "./types";
import { DatePickerModal, pt, registerTranslation } from 'react-native-paper-dates';

const FiltrarDatas = ({
    visivel,
    setVisivel,
    callback,
    valorAtual
}:FiltrarDatasContrato) => {
    const cancelar = () => setVisivel(false);
    const filtrar = (datas:DatasContrato) => {
      cancelar();
      callback(datas);
    };

    registerTranslation("pt", pt);

    return (
      <DatePickerModal
        locale="pt"
        mode="range"
        visible={visivel}
        onDismiss={cancelar}
        startDate={valorAtual?.inicio}
        endDate={valorAtual?.fim}
        onConfirm={(params) => {
          filtrar({
            inicio: params.startDate,
            fim: params.endDate
          } as DatasContrato)
        }}
        uppercase={false}
        startLabel="Inicio"
        endLabel="Fim"
        saveLabel="Filtrar"
      />
    );
}

export default FiltrarDatas;