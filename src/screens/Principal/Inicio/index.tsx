import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import { StatusConsultas } from '@repository/Consultas/types';

import ObterStatusConsultasHelper from '@helpers/Consultas/ObterStatus';

import ConsultasCadastradasFinalizadas from '@components/Graficos/ConsultasCadastradasFinalizadas';
import IdadePacientesCadastrados from '@components/Graficos/IdadePacientesCadastrados';
import IdadePacientesConsultados from '@components/Graficos/IdadePacientesConsultados';

import getMainStyles from '../styles';

import { InicioContrato } from './types';

const Inicio = ({
  paginaAtiva
}: InicioContrato): JSX.Element => {
  const styles = getMainStyles();
  const [dadosConsultasCadastradasFinalizadas, setDadosConsultasCadastradasFinalizadas] = useState<StatusConsultas>();

  const obterDadosConsultasCadastradasFinalizadas = async (): Promise<void> => {
    const helper = new ObterStatusConsultasHelper();
    const dados = await helper.executar();
    setDadosConsultasCadastradasFinalizadas(dados);
  };

  useEffect(() => {
    if (paginaAtiva) {
      void obterDadosConsultasCadastradasFinalizadas();
    }
  }, [paginaAtiva]);

  return (
      <ScrollView scrollEventThrottle={400} contentContainerStyle={styles.conteudo}>
        <ConsultasCadastradasFinalizadas dados={dadosConsultasCadastradasFinalizadas}/>
        <IdadePacientesConsultados />
        <IdadePacientesCadastrados />
      </ScrollView>
  );
};

export default Inicio;
