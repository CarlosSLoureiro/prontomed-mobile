import { useEffect, useRef, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import { NotifierComponents } from 'react-native-notifier';
import { Portal } from 'react-native-paper';

import Paciente from '@entity/paciente';

import ListarPacientesHelper from '@helpers/pacientes/listar';
import ObterTotalPacientesHelper from '@helpers/pacientes/obterTotal';

import Notification from '@hooks/useNotification';

import PacienteCard from '@components/Paciente/Card';
import Opcoes from '@components/Paciente/Opcoes';

import getMainStyles from '../styles';

import {
  FiltrosDeBuscaContrato,
  PacientesContrato
} from './types';

const Pacientes = ({
  paginaAtiva
}: PacientesContrato): JSX.Element => {
  const styles = getMainStyles();
  const [carregando, setCarregando] = useState(false);
  const [pacientes, setPacientes] = useState<Array<Paciente>>([]);
  const [pacientesPagina, setPacientesPagina] = useState(0);
  const [totalPacientes, setTotalPacientes] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const filtrosDeBuscaInicial: FiltrosDeBuscaContrato = {
    ordenacao: {
      ordem: 'decrescente',
      chave: 'id'
    }
  };
  const [filtrosDeBusca, setFiltrosDeBusca] = useState<FiltrosDeBuscaContrato>(filtrosDeBuscaInicial);

  const carregarTotalPacientes = async (): Promise<void> => {
    const helper = new ObterTotalPacientesHelper();
    const total = await helper.run();
    setTotalPacientes(total);
  };

  const carregarPacientes = async (): Promise<void> => {
    const helper = new ListarPacientesHelper();
    const pacientesCarregados = await helper.run(pacientesPagina);
    setPacientes([...pacientes, ...pacientesCarregados]);
    setPacientesPagina(pacientesPagina + 1);
  };

  useEffect(() => {
    console.log('Deve buscar pacientes ->', filtrosDeBusca);
    Notification.info({
      title: 'Deve buscar pacientes',
      description: JSON.stringify(filtrosDeBusca)
    });

    void carregarTotalPacientes();
    void carregarPacientes(); // testando repository
  }, [filtrosDeBusca]);

  const sobirScrollParaOTopo = (): void => {
    scrollRef?.current?.scrollTo({
      y: 0,
      animated: true
    });
  };

  const deveCarregarMais = ({ layoutMeasurement, contentOffset, contentSize }: any): boolean => {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return (!carregando) && ((layoutMeasurement.height + contentOffset.y) >= contentSize.height);
  };

  const carregarMaisPacientes = async (): Promise<void> => {
    if (pacientes.length < totalPacientes) {
      await carregarPacientes();
    } else {
      Notification.add({
        title: 'Não há mais pacientes',
        description: 'Tente alterar os filtros de busca',
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'error'
        },
        duration: 5000
      });
    }
  };

  if (!paginaAtiva) {
    sobirScrollParaOTopo();
  }

  return (
      <ScrollView scrollEventThrottle={400}
        onScroll={({ nativeEvent }): void => {
          if (deveCarregarMais(nativeEvent)) {
            void (async () => {
              setCarregando(true);
              await carregarMaisPacientes()
                .finally(() => setCarregando(false));
            })();
          }
        }}
        ref={scrollRef}
        contentContainerStyle={styles.conteudo}
      >
        <Portal>
          <Opcoes
            visivel={paginaAtiva}
            buscar={() => {}}
            filtrarDatas={() => {}}
            ordenar={() => {}}
            limpar={{
              visivel: JSON.stringify(filtrosDeBuscaInicial) !== JSON.stringify(filtrosDeBusca),
              callback: () => setFiltrosDeBusca(filtrosDeBuscaInicial)
            }}
          />
        </Portal>
        <Icon type="Entypo" name="users" size={124} style={styles.icon} />
        <Text style={styles.text}>Você possui {totalPacientes} pacientes!</Text>
        {
          pacientes.map((paciente, index) => <PacienteCard key={index} paciente={paciente} ultimo={pacientes.length - 1 === index} />)
        }
      </ScrollView>
  );
};

export default Pacientes;
