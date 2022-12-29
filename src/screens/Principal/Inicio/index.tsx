import { ScrollView } from 'react-native';

import ConsultasCadastradasFinalizadas from '@components/Graficos/ConsultasCadastradasFinalizadas';
import IdadePacientesCadastrados from '@components/Graficos/IdadePacientesCadastrados';
import IdadePacientesConsultados from '@components/Graficos/IdadePacientesConsultados';

import getMainStyles from '../styles';

import { InicioContrato } from './types';

const Inicio = ({
  paginaAtiva
}: InicioContrato): JSX.Element => {
  const styles = getMainStyles();

  return (
      <ScrollView scrollEventThrottle={400} contentContainerStyle={styles.conteudo}>
        <ConsultasCadastradasFinalizadas />
        <IdadePacientesConsultados />
        <IdadePacientesCadastrados />
      </ScrollView>
  );
};

export default Inicio;
