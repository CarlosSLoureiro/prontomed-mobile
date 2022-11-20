import { useState } from "react";
import { DatasContrato } from "@screens/Principal/Consultas/types";
import { FiltrarDatasContrato } from "./types";
import { DatePickerModal, pt, registerTranslation } from 'react-native-paper-dates';

const FiltrarDatas = ({
    visivel,
    setVisivel,
    callback
}:FiltrarDatasContrato) => {
    const cancelar = () => setVisivel(false);
    const filtrar = (datas:DatasContrato) => {
      setBuscarEntreDatas(datas);
      cancelar();
      callback(datas);
    };
    const [buscarEntreDatas, setBuscarEntreDatas] = useState<DatasContrato|null>(null);

    registerTranslation("pt", pt);

    return (
      <DatePickerModal
        locale="pt"
        mode="range"
        visible={visivel}
        onDismiss={cancelar}
        startDate={buscarEntreDatas?.dataInicio}
        endDate={buscarEntreDatas?.dataFim}
        onConfirm={(params) => {
          filtrar({
            dataInicio: params.startDate,
            dataFim: params.endDate
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