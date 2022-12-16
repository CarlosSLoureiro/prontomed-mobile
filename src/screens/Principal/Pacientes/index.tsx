import { useEffect, useRef, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { NotifierComponents } from 'react-native-notifier';
import { Portal } from 'react-native-paper';

import Paciente from '@entity/Paciente';
import { FiltrosDeBuscarPacientesContrato, OrdenacaoPacientesContrato } from '@repository/Pacientes/types';

import CadastrarPacientesHelper from '@helpers/Pacientes/Cadastrar';
import ListarPacientesHelper from '@helpers/Pacientes/Listar';
import ObterTotalPacientesHelper from '@helpers/Pacientes/ObterTotal';

import Notification from '@hooks/useNotification';

import PacienteCard from '@components/Paciente/Card';
import Buscar from '@components/Paciente/Dialogs/Buscar';
import { BuscarPacienteCallbackContrato } from '@components/Paciente/Dialogs/Buscar/types';
import Cadastrar from '@components/Paciente/Dialogs/Cadastrar';
import Ordenar from '@components/Paciente/Dialogs/Ordenar';
import Opcoes from '@components/Paciente/Opcoes';

import getMainStyles from '../styles';

import { PacientesContrato } from './types';

const Pacientes = ({
  paginaAtiva
}: PacientesContrato): JSX.Element => {
  const styles = getMainStyles();
  const [carregando, setCarregando] = useState(false);
  const [pacientes, setPacientes] = useState<Array<Paciente>>([]);
  const [pacientesAdicionados, setPacientesAdicionados] = useState<Array<Paciente>>([]);
  const [pacientesPagina, setPacientesPagina] = useState(0);
  const [totalPacientes, setTotalPacientes] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const filtrosDeBuscaInicial: FiltrosDeBuscarPacientesContrato = {
    ordenacao: {
      ordem: 'decrescente',
      chave: 'id'
    }
  };
  const [filtrosDeBusca, setFiltrosDeBusca] = useState<FiltrosDeBuscarPacientesContrato>(filtrosDeBuscaInicial);
  const [buscarVisivel, setBuscarVisivel] = useState(false);
  const [cadastrarVisivel, setCadastrarVisivel] = useState(false);
  const [ordernarVisivel, setOrdernarVisivel] = useState(false);

  const carregarTotalPacientes = async (): Promise<void> => {
    const helper = new ObterTotalPacientesHelper();
    const total = await helper.executar();
    setTotalPacientes(total);
  };

  const carregarPacientes = async (): Promise<void> => {
    const helper = new ListarPacientesHelper();
    const pacientesCarregados = await helper.executar(pacientesPagina, filtrosDeBusca);

    /* funde os resultados */
    const listagem = [...pacientes, ...pacientesCarregados.filter(pacienteCarregado => {
      return !pacientes.some(paciente => paciente.id === pacienteCarregado.id);
    })];

    setPacientes(listagem);
    setPacientesPagina(pacientesPagina + 1);
  };

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

  const buscarPacientes = (busca?: BuscarPacienteCallbackContrato): void => {
    setFiltrosDeBusca({
      ...filtrosDeBusca,
      ...{ busca }
    });
  };

  const cadastrarPaciente = async (dados: Partial<Paciente>): Promise<Paciente | undefined> => {
    const helper = new CadastrarPacientesHelper();

    try {
      const paciente = await helper.executar(dados);

      Notification.success({
        title: `Paciente ${paciente.nome} cadastrado`,
        duration: 10000
      });

      setPacientes([...[paciente], ...pacientes]);
      setPacientesAdicionados([...[paciente], ...pacientesAdicionados]);
      setTotalPacientes(totalPacientes + 1);
      sobirScrollParaOTopo();

      return paciente;
    } catch (err) {
      Notification.error({
        title: 'Não foi possível cadastrar o paciente',
        description: (err as Error).message,
        duration: 10000
      });
    }
  };

  const reordenarPacientes = (ordenacao: OrdenacaoPacientesContrato): void => {
    setFiltrosDeBusca({
      ...filtrosDeBusca,
      ...{ ordenacao }
    });
  };

  useEffect(() => {
    console.log('Deve buscar pacientes ->', filtrosDeBusca);
    Notification.info({
      title: 'Deve buscar pacientes',
      description: JSON.stringify(filtrosDeBusca)
    });

    setPacientesPagina(0);
    void carregarTotalPacientes();
    void carregarPacientes();
  }, [filtrosDeBusca]);

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
          <Buscar visivel={buscarVisivel} setVisivel={setBuscarVisivel} callback={buscarPacientes}/>
          <Cadastrar visivel={cadastrarVisivel} setVisivel={setCadastrarVisivel} callback={cadastrarPaciente}/>
          <Ordenar
            visivel={ordernarVisivel} setVisivel={setOrdernarVisivel} callback={reordenarPacientes}
            valorAtual={filtrosDeBusca.ordenacao}
            valoresDeBusca={[
              { titulo: 'Pelo nome do paciente', valor: 'nome' },
              { titulo: 'Pela idade do paciente', valor: 'idade' },
              { titulo: 'Pelo peso do paciente', valor: 'peso' },
              { titulo: 'Pela altura do paciente', valor: 'altura' },
              { titulo: 'Pela número do paciente', valor: 'id' },
              { titulo: 'Pela número de consultas', valor: 'consultas' }
            ]}
          />
          <Opcoes
            visivel={paginaAtiva && !(buscarVisivel || cadastrarVisivel || ordernarVisivel)}
            buscar={() => setBuscarVisivel(true)}
            cadastrar={() => setCadastrarVisivel(true)}
            ordenar={() => setOrdernarVisivel(true)}
            limpar={{
              visivel: JSON.stringify(filtrosDeBuscaInicial) !== JSON.stringify(filtrosDeBusca),
              callback: () => setFiltrosDeBusca(filtrosDeBuscaInicial)
            }}
          />
        </Portal>
        <Text style={styles.text}>Você possui {totalPacientes} pacientes!</Text>
        {
          pacientes.map((paciente, index) => <PacienteCard key={index} paciente={paciente} ultimo={pacientes.length - 1 === index} />)
        }
      </ScrollView>
  );
};

export default Pacientes;
