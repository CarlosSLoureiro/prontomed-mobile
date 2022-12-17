import { useEffect, useState } from 'react';
import { FAB } from 'react-native-paper';

import { OcpoesBotaoContrato } from './types';

const OcpoesBotao = ({
  visivel,
  buscar,
  filtrarDatas,
  ordenar,
  limpar
}: OcpoesBotaoContrato): JSX.Element => {
  const [aberto, setAberto] = useState(false);
  const botoesPadrao = [
    {
      icon: 'magnify',
      label: 'Buscar',
      onPress: buscar
    },
    {
      icon: 'calendar-range-outline',
      label: 'Filtrar datas',
      onPress: filtrarDatas
    },
    {
      icon: 'order-alphabetical-ascending',
      label: 'Ordenar',
      onPress: ordenar
    }
  ];
  const botaoLimpar = {
    icon: 'restart',
    label: 'Limpar filtros',
    onPress: limpar.callback
  };

  const [botoes, setBotoes] = useState(botoesPadrao);

  useEffect(() => {
    setBotoes(limpar.visivel ? [botaoLimpar].concat(botoesPadrao) : botoesPadrao);
  }, [limpar.visivel]);

  return (
        <FAB.Group
            visible={visivel}
            open={aberto}
            style={{
              paddingBottom: 100,
              marginRight: -10
            }}
            fabStyle={{
              backgroundColor: '#fff'
            }}
            icon={aberto ? 'calendar-account-outline' : 'plus'}
            actions={botoes}
            onStateChange={({ open }) => setAberto(open)}
        />
  );
};

export default OcpoesBotao;
