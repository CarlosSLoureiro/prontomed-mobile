import { ScrollView, Text } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import getMainStyles from '../styles';
import PacienteCard from '@components/Paciente/Card';

const Pacientes = (): JSX.Element => {
  const styles = getMainStyles();

  return (
      <ScrollView contentContainerStyle={styles.conteudo}>
        <Icon type="Entypo" name="users" size={124} style={styles.icon} />
        <Text style={styles.text}>Pacientes!</Text>
        <PacienteCard />
        <PacienteCard />
        <PacienteCard />
        <PacienteCard />
        <PacienteCard />
        <PacienteCard />
        <PacienteCard />
        <PacienteCard />
        <PacienteCard />
        <PacienteCard />
        <PacienteCard />
        <PacienteCard />
        <PacienteCard />
        <PacienteCard ultimo={true} />
      </ScrollView>
  );
};

export default Pacientes;
