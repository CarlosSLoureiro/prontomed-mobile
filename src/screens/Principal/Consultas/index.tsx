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

import ExcluirConsultasHelper from '@helpers/Consultas/Excluir';
import FinalizarConsultasHelper from '@helpers/Consultas/Finalizar';
import ListarConsultasHelper from '@helpers/Consultas/Listar';
import ObterTotalConsultasHelper from '@helpers/Consultas/ObterTotal';

import Notification from '@hooks/useNotification';

import ConsultaCard from '@components/Consulta/Card';
import Buscar from '@components/Consulta/Dialogs/Buscar';
import Excluir from '@components/Consulta/Dialogs/Excluir';
import FiltrarDatas from '@components/Consulta/Dialogs/FiltrarDatas';
import Ordenar from '@components/Consulta/Dialogs/Ordenar';
import Opcoes from '@components/Consulta/Opcoes';

import getMainStyles from '../styles';

import { ConsultasContrato } from './types';

const Consultas = ({
  paginaAtiva
}: ConsultasContrato): JSX.Element => {
  const styles = getMainStyles();
  const consultasPorPagina = 10;

  const [carregando, setCarregando] = useState(false);
  const [consultasDoDia, setConsultasDoDia] = useState(false);
  const [consultas, setConsultas] = useState<Array<Consulta>>([]);
  const [consultasPagina, setConsultasPagina] = useState(0);
  const [totalConsultas, setTotalConsultas] = useState(0);
  const [totalConsultasAgendadas, setTotalConsultasAgendadas] = useState(0);
  const [totalConsultasAtrasadas, setTotalConsultasAtrasadas] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const [buscarVisivel, setBuscarVisivel] = useState(false);
  const [filtrarDatasVisivel, setFiltrarDatasVisivel] = useState(false);
  const [ordenarVisivel, setOrdenarVisivel] = useState(false);

  const excluirConsultaRef = useRef<any>();

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

  const carregarTotalAgendadas = async (): Promise<void> => {
    const helper = new ObterTotalConsultasHelper();
    const total = await helper.executar('agendadas');
    setTotalConsultasAgendadas(total);
  };

  const carregarTotalAtrasadas = async (): Promise<void> => {
    const helper = new ObterTotalConsultasHelper();
    const total = await helper.executar('atrasadas');
    setTotalConsultasAtrasadas(total);
  };

  const carregarConsultas = async (deveResetar = false): Promise<void> => {
    const helper = new ListarConsultasHelper();

    try {
      const listagemAtual = deveResetar ? [] : consultas;
      const paginaAtual = deveResetar ? 0 : consultasPagina;

      const consultasCarregados = await helper.executar(paginaAtual, consultasPorPagina, filtrosDeBusca);

      if (consultasCarregados.length) {
        /* funde os resultados */
        const listagem = [...listagemAtual, ...consultasCarregados.filter(consultaCarregado => {
          return !listagemAtual.some(consulta => consulta.id === consultaCarregado.id);
        })];

        setConsultas(listagem);
        setConsultasPagina(paginaAtual + 1);
      } else {
        const baseTotalConsultas = (filtrosDeBusca.busca?.finalizadas ?? false) ? totalConsultas : totalConsultasAgendadas;
        if (baseTotalConsultas > consultasPorPagina) {
          if (paginaAtual > 0) {
            Notification.info({
              title: 'Não há mais consultas',
              description: 'Tente alterar os filtros de busca',
              duration: 5000
            });
          } else if (totalConsultas) {
            setConsultas([]);
            Notification.info({
              title: 'Não há consultas',
              description: 'Tente alterar os filtros de busca',
              duration: 5000
            });
          }
        }
      }
    } catch (err) {
      Notification.error({
        title: 'Não foi possível carregar a listagem',
        description: (err as Error).message,
        duration: 10000
      });
    }
  };

  const finalizarConsulta = async (consulta: Consulta): Promise<void> => {
    const helper = new FinalizarConsultasHelper();

    try {
      const consultaEditada = await helper.executar(consulta);

      if (filtrosDeBusca.busca?.finalizadas === false) {
        setConsultas([...consultas.filter(consulta => (consulta.id !== consultaEditada.id))]);
      }

      Notification.success({
        title: `Consulta Nº ${consultaEditada.id} finalizada com sucesso`,
        duration: 5000
      });

      carregarTotaisConsultas();
    } catch (err) {
      Notification.error({
        title: 'Não foi possível finalizar a consulta',
        description: (err as Error).message,
        duration: 10000
      });
    }
  };

  const excluirConsulta = async (consulta: Consulta): Promise<Consulta | undefined> => {
    const helper = new ExcluirConsultasHelper();

    try {
      const consultaExcluida = await helper.executar(consulta);

      setConsultas([...consultas.filter(consultas => (consultas.id !== consultaExcluida.id))]);

      Notification.success({
        title: 'Consulta excluída com sucesso',
        duration: 5000
      });

      carregarTotaisConsultas();

      return consultaExcluida;
    } catch (err) {
      Notification.error({
        title: 'Não foi possível excluir a consulta',
        description: (err as Error).message,
        duration: 10000
      });
    }
  };

  const sobirScrollParaOTopo = (): void => {
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

  const obterStatus = (): string => {
    const todasAsBuscas = filtrosDeBusca.busca?.finalizadas ?? false;
    if (totalConsultas > 0) {
      const consultasRegistradas = totalConsultas > 1 ? 'consultas registradas' : 'consulta registrada';
      const consultasAgendadasStr = totalConsultasAgendadas > 1 ? 'consultas agendadas' : 'consulta agendada';
      const atrasadasStr = totalConsultasAtrasadas > 1 ? 'atrasadas' : 'atrasada';

      if (todasAsBuscas) {
        return `Você possui ${totalConsultas} ${consultasRegistradas}`;
      } else if (totalConsultasAtrasadas > 0) {
        return `Você possui ${totalConsultasAgendadas} ${consultasAgendadasStr} e ${totalConsultasAtrasadas} ${atrasadasStr}`;
      } else {
        return `Você possui ${totalConsultasAgendadas} ${consultasAgendadasStr}`;
      }
    } else {
      return 'Você não possui consultas registradas';
    }
  };

  const carregarTotaisConsultas = () => {
    void carregarTotalConsultas();
    void carregarTotalAgendadas();
    void carregarTotalAtrasadas();
  };

  useEffect(() => {
    void carregarConsultas(true);
    carregarTotaisConsultas();
  }, [filtrosDeBusca]);

  useEffect(() => {
    if (paginaAtiva) {
      setFiltrosDeBusca({ ...filtrosDeBuscaInicial });
      setConsultasDoDia(false);
      sobirScrollParaOTopo();
    }
  }, [paginaAtiva]);

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
          <Buscar
            visivel={buscarVisivel}
            setVisivel={setBuscarVisivel}
            callback={buscarConsultas}
            valorAtual={filtrosDeBusca?.busca}
          />
          <FiltrarDatas
            visivel={filtrarDatasVisivel}
            setVisivel={setFiltrarDatasVisivel}
            callback={filtrarDatasConsultas}
            valorAtual={filtrosDeBusca?.datas}
          />
          <Excluir
            formularioRef={excluirConsultaRef}
            callback={excluirConsulta}
          />
          <Ordenar
            visivel={ordenarVisivel}
            setVisivel={setOrdenarVisivel}
            callback={reordenarConsultas}
            valorAtual={filtrosDeBusca.ordenacao}
            valoresDeBusca={[
              { titulo: 'Pela data de agendamento', valor: 'dataAgendada' },
              { titulo: 'Pelo número da consulta', valor: 'id' }
            ]}
          />
          <Opcoes
            visivel={paginaAtiva && !(buscarVisivel || filtrarDatasVisivel || ordenarVisivel)}
            botoes={[
              {
                visivel: JSON.stringify(filtrosDeBuscaInicial) !== JSON.stringify(filtrosDeBusca),
                icon: 'restart',
                nome: 'Limpar filtros',
                callback: () => {
                  setConsultasDoDia(false);
                  setFiltrosDeBusca(filtrosDeBuscaInicial);
                }
              },
              {
                visivel: true,
                icon: 'magnify',
                nome: 'Buscar',
                callback: () => setBuscarVisivel(true)
              },
              {
                visivel: !consultasDoDia && filtrosDeBusca?.datas === undefined,
                icon: 'calendar-clock',
                nome: 'Consultas do dia',
                callback: (): void => {
                  const inicioDoDia = new Date();
                  inicioDoDia.setHours(0, 0, 0, 0);

                  const fimDoDia = new Date();
                  fimDoDia.setHours(23, 59, 59, 99);

                  setConsultasDoDia(true);

                  setFiltrosDeBusca({
                    ...filtrosDeBusca,
                    datas: {
                      inicio: inicioDoDia,
                      fim: fimDoDia
                    }
                  });
                }
              },
              {
                visivel: !consultasDoDia,
                icon: 'calendar-range-outline',
                nome: 'Filtrar datas',
                callback: () => setFiltrarDatasVisivel(true)
              },
              {
                visivel: true,
                icon: 'order-alphabetical-ascending',
                nome: 'Ordenar',
                callback: () => setOrdenarVisivel(true)
              }
            ]}
          />
        </Portal>
        <Text style={styles.text}>{ obterStatus() }</Text>
        {
          consultas.map((consulta, index) => <ConsultaCard
            key={index}
            excluirFormularioRef={excluirConsultaRef}
            finalizarConsulta={finalizarConsulta}
            consulta={consulta}
            ultimo={consultas.length - 1 === index}
          />)
        }
      </ScrollView>
  );
};

export default Consultas;
