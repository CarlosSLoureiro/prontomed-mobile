import { useEffect, useRef, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import { NotifierComponents } from 'react-native-notifier';
import { Portal } from 'react-native-paper';

import { useDatabase } from '@database';

import Notification from '@hooks/useNotification';

import ConsultaCard from '@components/Consulta/Card';
import { ConsultaCardContrato } from '@components/Consulta/Card/types';
import Buscar from '@components/Consulta/Dialogs/Buscar';
import FiltrarDatas from '@components/Consulta/Dialogs/FiltrarDatas';
import Ordenar from '@components/Consulta/Dialogs/Ordenar';
import Opcoes from '@components/Consulta/Opcoes';

import getMainStyles from '../styles';

import items from './items';

import {
  BuscaContrato,
  ConsultasContrato,
  DatasContrato,
  FiltrosDeBuscaContrato,
  OrdenacaoContrato
} from './types';

const Consultas = ({
  paginaAtiva
}: ConsultasContrato): JSX.Element => {
  const styles = getMainStyles();
  const [carregando, setCarregando] = useState(false);
  const [consultas, setConsultas] = useState<Array<ConsultaCardContrato>>(items);
  const scrollRef = useRef<ScrollView>(null);
  const [buscarVisivel, setBuscarVisivel] = useState(false);
  const [filtrarDatasVisivel, setFiltrarDatasVisivel] = useState(false);
  const [ordenarVisivel, setOrdenarVisivel] = useState(false);
  const filtrosDeBuscaInicial: FiltrosDeBuscaContrato = {
    ordenacao: {
      ordem: 'decrescente',
      chave: 'data'
    }
  };
  const [filtrosDeBusca, setFiltrosDeBusca] = useState<FiltrosDeBuscaContrato>(filtrosDeBuscaInicial);

  const { pacientesRepository } = useDatabase();
  const getUsers = async (): Promise<void> => {
    const pacientes = await pacientesRepository.getAll();
    console.log('pacientes >>> ', pacientes);
  };

  useEffect(() => {
    // TODO: atualizar resultados
    console.log('Deve buscar consultas ->', filtrosDeBusca);

    // void getUsers(); // testando repository

    Notification.info({
      title: 'Deve buscar consultas',
      description: JSON.stringify(filtrosDeBusca)
    });
  }, [filtrosDeBusca]);

  const sobirScrollParaOTopo = () => {
    scrollRef?.current?.scrollTo({
      y: 0,
      animated: true
    });
  };

  const buscarConsultas = (busca?: BuscaContrato): void => {
    setFiltrosDeBusca({
      ...filtrosDeBusca,
      ...{ busca }
    });
  };

  const filtrarDatasConsultas = (datas: DatasContrato): void => {
    setFiltrosDeBusca({
      ...filtrosDeBusca,
      ...{ datas }
    });
  };

  const reordenarConsultas = (ordenacao: OrdenacaoContrato): void => {
    setFiltrosDeBusca({
      ...filtrosDeBusca,
      ...{ ordenacao }
    });
  };

  const deveCarregarMais = ({ layoutMeasurement, contentOffset, contentSize }: any): boolean => {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return (!carregando) && ((layoutMeasurement.height + contentOffset.y) >= contentSize.height);
  };

  interface EntidadeConsulta {
    nome: string;
  }

  const fakeRepositoryObterConsultas = async (): Promise<Array<EntidadeConsulta>> => {
    const fakeRepository = Promise.resolve([{
      nome: `carlos loureiro #${consultas.length}`
    },
    {
      nome: `jessie #${consultas.length}`
    }]);

    return await fakeRepository;
  };
  const carregarConsultas = async (): Promise<void> => {
    console.log('deve carregar >>>');
    if (consultas.length < 15) {
      const novasConsultas = await fakeRepositoryObterConsultas();
      setConsultas([...consultas, ...novasConsultas]);
    } else {
      Notification.add({
        title: 'Não há mais consultas',
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
            setCarregando(true);
            void (async () => {
              await carregarConsultas()
                .finally(() => setCarregando(false));
            })();
          }
        }}
        ref={scrollRef}
        contentContainerStyle={styles.conteudo}
      >
        <Portal>
          <Buscar visivel={buscarVisivel} setVisivel={setBuscarVisivel} callback={buscarConsultas}/>
          <FiltrarDatas visivel={filtrarDatasVisivel} setVisivel={setFiltrarDatasVisivel} callback={filtrarDatasConsultas} valorAtual={filtrosDeBusca?.datas}/>
          <Ordenar visivel={ordenarVisivel} setVisivel={setOrdenarVisivel} callback={reordenarConsultas} valorAtual={filtrosDeBusca.ordenacao}/>
          <Opcoes
            visivel={paginaAtiva}
            buscar={() => setBuscarVisivel(true)}
            filtrarDatas={() => setFiltrarDatasVisivel(true)}
            ordenar={() => setOrdenarVisivel(true)}
            limpar={{
              visivel: JSON.stringify(filtrosDeBuscaInicial) !== JSON.stringify(filtrosDeBusca),
              callback: () => setFiltrosDeBusca(filtrosDeBuscaInicial)
            }}
          />
        </Portal>
        <Icon type="FontAwesome" name="calendar-check-o" size={124} style={styles.icon} />
        <Text style={styles.text}>Suas consultas!</Text>
        {
          consultas.map((consulta, index) => <ConsultaCard key={index} {...consulta} ultimo={consultas.length - 1 === index} />)
        }
      </ScrollView>
  );
};

export default Consultas;
