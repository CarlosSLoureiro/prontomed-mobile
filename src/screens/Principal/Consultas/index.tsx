import { useEffect, useRef, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { Portal } from 'react-native-paper';

import Consulta from '@entity/Consulta';
import {
  BuscarConsultasContrato,
  DatasConsultasContrato,
  FiltrosDeBuscarConsultasContrato,
  OrdenacaoConsultasContrato
} from '@repository/Consultas/types';

import ListarConsultasHelper from '@helpers/Consultas/Listar';
import ObterTotalConsultasHelper from '@helpers/Consultas/ObterTotal';

import Notification from '@hooks/useNotification';

import ConsultaCard from '@components/Consulta/Card';
import Buscar from '@components/Consulta/Dialogs/Buscar';
import FiltrarDatas from '@components/Consulta/Dialogs/FiltrarDatas';
import Ordenar from '@components/Consulta/Dialogs/Ordenar';
import Opcoes from '@components/Consulta/Opcoes';

import getMainStyles from '../styles';

import { ConsultasContrato } from './types';

const Consultas = ({
  paginaAtiva
}: ConsultasContrato): JSX.Element => {
  const styles = getMainStyles();
  const [carregando, setCarregando] = useState(false);
  const [consultas, setConsultas] = useState<Array<Consulta>>([]);
  const [consultasPagina, setConsultasPagina] = useState(0);
  const [totalConsultas, setTotalConsultas] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const [buscarVisivel, setBuscarVisivel] = useState(false);
  const [filtrarDatasVisivel, setFiltrarDatasVisivel] = useState(false);
  const [ordenarVisivel, setOrdenarVisivel] = useState(false);
  const filtrosDeBuscaInicial: FiltrosDeBuscarConsultasContrato = {
    ordenacao: {
      ordem: 'decrescente',
      chave: 'dataAgendada'
    }
  };
  const [filtrosDeBusca, setFiltrosDeBusca] = useState<FiltrosDeBuscarConsultasContrato>(filtrosDeBuscaInicial);

  const carregarTotalConsultas = async (): Promise<void> => {
    const helper = new ObterTotalConsultasHelper();
    const total = await helper.executar();
    setTotalConsultas(total);
  };

  const sobirScrollParaOTopo = () => {
    scrollRef?.current?.scrollTo({
      y: 0,
      animated: true
    });
  };

  const buscarConsultas = (busca?: BuscarConsultasContrato): void => {
    setFiltrosDeBusca({
      ...filtrosDeBusca,
      ...{ busca }
    });
  };

  const filtrarDatasConsultas = (datas: DatasConsultasContrato): void => {
    setFiltrosDeBusca({
      ...filtrosDeBusca,
      ...{ datas }
    });
  };

  const reordenarConsultas = (ordenacao: OrdenacaoConsultasContrato): void => {
    setFiltrosDeBusca({
      ...filtrosDeBusca,
      ...{ ordenacao }
    });
  };

  const deveCarregarMais = ({ layoutMeasurement, contentOffset, contentSize }: any): boolean => {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return (!carregando) && ((layoutMeasurement.height + contentOffset.y) >= contentSize.height);
  };

  const carregarConsultas = async (deveResetar = false): Promise<void> => {
    const helper = new ListarConsultasHelper();

    try {
      const listagemAtual = deveResetar ? [] : consultas;
      const paginaAtual = deveResetar ? 0 : consultasPagina;

      const consultasCarregados = await helper.executar(paginaAtual, filtrosDeBusca);

      if (consultasCarregados.length) {
        /* funde os resultados */
        const listagem = [...listagemAtual, ...consultasCarregados.filter(consultaCarregado => {
          return !listagemAtual.some(consulta => consulta.id === consultaCarregado.id);
        })];

        setConsultas(listagem);
        setConsultasPagina(paginaAtual + 1);
      } else if (!totalConsultas) {
        Notification.info({
          title: 'Não há consultas agendadas',
          duration: 5000
        });
      } else if (paginaAtual > 0) {
        Notification.info({
          title: 'Não há mais consultas agendadas',
          description: 'Tente alterar os filtros de busca',
          duration: 5000
        });
      } else {
        setConsultas([]);
        Notification.info({
          title: 'Não há consultas',
          description: 'Tente alterar os filtros de busca',
          duration: 5000
        });
      }
    } catch (err) {
      Notification.error({
        title: 'Não foi possível carregar a listagem',
        description: (err as Error).message,
        duration: 10000
      });
    }
  };

  useEffect(() => {
    console.log('Deve buscar consultas ->', filtrosDeBusca);

    Notification.info({
      title: 'Deve buscar consultas',
      description: JSON.stringify(filtrosDeBusca)
    });

    void carregarConsultas();
    void carregarTotalConsultas();
  }, [filtrosDeBusca]);

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
        <Text style={styles.text}>Suas consultas!</Text>
        {
          consultas.map((consulta, index) => <ConsultaCard key={index} consulta={consulta} ultimo={consultas.length - 1 === index} />)
        }
      </ScrollView>
  );
};

export default Consultas;
