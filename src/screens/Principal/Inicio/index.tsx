import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import { StatusConsultas, StatusPacientes as StatusPacientesConsultados } from '@repository/Consultas/types';

import ObterStatusConsultasHelper from '@helpers/Consultas/ObterStatus';
import ObterStatusPacientesConsultasHelper from '@helpers/Consultas/ObterStatusPacientes';

import ConsultasCadastradasFinalizadas from '@components/Graficos/ConsultasCadastradasFinalizadas';
import IdadePacientesConsultados from '@components/Graficos/IdadePacientesConsultados';

import getMainStyles from '../styles';

import { InicioContrato } from './types';

const Inicio = ({
  paginaAtiva
}: InicioContrato): JSX.Element => {
  const styles = getMainStyles();
  const [dadosConsultasCadastradasFinalizadas, setDadosConsultasCadastradasFinalizadas] = useState<StatusConsultas>();
  const [dadosIdadePacientesConsultados, setDadosIdadePacientesConsultados] = useState<StatusPacientesConsultados>();

  const obterDadosConsultasCadastradasFinalizadas = async (): Promise<void> => {
    const helper = new ObterStatusConsultasHelper();
    const dados = await helper.executar();
    setDadosConsultasCadastradasFinalizadas(dados);
  };

  const obterDadosIdadePacientesConsultados = async (): Promise<void> => {
    const helper = new ObterStatusPacientesConsultasHelper();
    const dados = await helper.executar();
    setDadosIdadePacientesConsultados(dados);
  };
  useEffect(() => {
    if (paginaAtiva) {
      void obterDadosConsultasCadastradasFinalizadas();
      void obterDadosIdadePacientesConsultados();
    }
  }, [paginaAtiva]);

  return (
      <ScrollView scrollEventThrottle={400} contentContainerStyle={styles.conteudo}>
        <ConsultasCadastradasFinalizadas dados={dadosConsultasCadastradasFinalizadas}/>
        <IdadePacientesConsultados dados={dadosIdadePacientesConsultados}/>
      </ScrollView>
  );
};

export default Inicio;
