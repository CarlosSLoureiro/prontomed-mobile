import { useEffect, useState } from 'react';
import { FAB } from 'react-native-paper';

import { OcpoesPacienteContrato } from './types';

const OcpoesBotao = ({
  visivel,
  buscar,
  cadastrar,
  ordenar,
  limpar
}: OcpoesPacienteContrato): JSX.Element => {
  const [aberto, setAberto] = useState(false);
  const botoesPadrao = [
    {
      icon: 'magnify',
      label: 'Buscar',
      onPress: buscar
    },
    {
      icon: 'account-plus',
      label: 'Cadastrar',
      onPress: cadastrar
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
    setBotoes(limpar.visivel ? botoesPadrao.concat([botaoLimpar]) : botoesPadrao);
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
            icon={aberto ? 'account-multiple' : 'plus'}
            actions={botoes}
            onStateChange={({ open }) => setAberto(open)}
        />
  );
};

export default OcpoesBotao;
