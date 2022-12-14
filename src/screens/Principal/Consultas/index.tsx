import { useEffect, useRef, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { Portal } from 'react-native-paper';

import Consulta from '@entity/Consulta';
import Observacao from '@entity/Observacao';
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
import ReabrirConsultasHelper from '@helpers/Consultas/Reabrir';
import ReagendarConsultasHelper from '@helpers/Consultas/Reagendar';
import CadastrarObservacaoHelper from '@helpers/Observacoes/Cadastrar';
import EditarObservacaoHelper from '@helpers/Observacoes/Editar';
import ExcluirObservacaoHelper from '@helpers/Observacoes/Excluir';
import ConsultaEmConflitoError from '@errors/ConsultaEmConflito';

import Notification from '@utils/Notification';

import ConsultaCard from '@components/Consulta/Card';
import Buscar from '@components/Consulta/Dialogs/Buscar';
import Excluir from '@components/Consulta/Dialogs/Excluir';
import FiltrarDatas from '@components/Consulta/Dialogs/FiltrarDatas';
import FinalizarReabrir from '@components/Consulta/Dialogs/FinalizarReabrir';
import Observacoes from '@components/Consulta/Dialogs/Observacoes';
import Ordenar from '@components/Consulta/Dialogs/Ordenar';
import ReagendarConsulta from '@components/Consulta/Dialogs/Reagendar';
import ReagendarEmConflito from '@components/Consulta/Dialogs/ReagendarEmConflito';
import Legenda from '@components/Consulta/Legenda';
import MenuOpcoes from '@components/MenuOpcoes';

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
  const [reagendarVisivel, setReagendarVisivel] = useState(false);
  const [excluirVisivel, setExcluirVisivel] = useState(false);
  const [finalizarReabrirVisivel, setFinalizarReabrirVisivel] = useState(false);
  const [observacoesVisivel, setObservacoesVisivel] = useState(false);

  const [msgConsultaEmConflito, setMsgConsultaEmConflito] = useState('');
  const [consultaEmConflito, setConsultaEmConflito] = useState<Consulta>();
  const [reagendarEmConflitoVisivel, setReagendarEmConflitoVisivel] = useState(false);

  const reagendarConsultaRef = useRef<any>();
  const excluirConsultaRef = useRef<any>();
  const finalizarReabrirConsultaRef = useRef<any>();
  const observacoesConsultaRef = useRef<any>();

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
              title: 'N??o h?? mais consultas',
              description: 'Tente alterar os filtros de busca',
              duration: 5000
            });
          } else if (totalConsultas) {
            setConsultas([]);
            Notification.info({
              title: 'N??o h?? consultas',
              description: 'Tente alterar os filtros de busca',
              duration: 5000
            });
          }
        }
      }
    } catch (err) {
      Notification.error({
        title: 'N??o foi poss??vel carregar a listagem',
        description: (err as Error).message,
        duration: 10000
      });
    }
  };

  const finalizarConsulta = async (consulta: Consulta): Promise<Consulta | undefined> => {
    const helper = new FinalizarConsultasHelper();

    try {
      const consultaEditada = await helper.executar(consulta);

      Notification.success({
        title: `Consulta N?? ${consultaEditada.id} finalizada com sucesso`,
        duration: 5000
      });

      carregarTotaisConsultas();

      return consultaEditada;
    } catch (err) {
      Notification.error({
        title: 'N??o foi poss??vel finalizar a consulta',
        description: (err as Error).message,
        duration: 10000
      });
    }
  };

  const reabrirConsulta = async (consulta: Consulta): Promise<Consulta | undefined> => {
    const helper = new ReabrirConsultasHelper();

    try {
      const consultaEditada = await helper.executar(consulta);

      Notification.success({
        title: `Consulta N?? ${consultaEditada.id} reaberta com sucesso`,
        duration: 5000
      });

      carregarTotaisConsultas();

      return consultaEditada;
    } catch (err) {
      Notification.error({
        title: 'N??o foi poss??vel reabrir a consulta',
        description: (err as Error).message,
        duration: 10000
      });
    }
  };

  const reagendarConsulta = async (consulta: Consulta, ignorarConflito = false): Promise<Consulta | undefined> => {
    const helper = new ReagendarConsultasHelper();

    try {
      const consultaReagendada = await helper.executar(consulta, ignorarConflito);

      setConsultas([...consultas.map(consultas => (consultas.id === consultaReagendada.id) ? consultaReagendada : consultas)]);

      Notification.success({
        title: 'Consulta reagendada com sucesso',
        duration: 5000
      });

      carregarTotaisConsultas();

      if (ignorarConflito) {
        setReagendarVisivel(false);
      }

      void carregarConsultas(true);

      return consultaReagendada;
    } catch (err) {
      const msg = (err as Error).message;

      if (err instanceof ConsultaEmConflitoError) {
        setConsultaEmConflito(consulta);
        setMsgConsultaEmConflito(msg);
        setReagendarEmConflitoVisivel(true);
      } else {
        Notification.error({
          title: 'N??o foi poss??vel reagendar a consulta',
          description: msg,
          duration: 10000
        });
      }
    }
  };

  const excluirConsulta = async (consulta: Consulta): Promise<Consulta | undefined> => {
    const helper = new ExcluirConsultasHelper();

    try {
      const consultaExcluida = await helper.executar(consulta);

      setConsultas([...consultas.filter(consultas => (consultas.id !== consultaExcluida.id))]);

      Notification.success({
        title: 'Consulta exclu??da com sucesso',
        duration: 5000
      });

      carregarTotaisConsultas();

      return consultaExcluida;
    } catch (err) {
      Notification.error({
        title: 'N??o foi poss??vel excluir a consulta',
        description: (err as Error).message,
        duration: 10000
      });
    }
  };

  const observarConsulta = async (consulta: Consulta, observacao: Partial<Observacao>): Promise<Observacao | undefined> => {
    const callback = observacao.id !== undefined ? editarObservacao : cadastrarObservacao;
    return await callback(consulta, observacao);
  };

  const cadastrarObservacao = async (consulta: Consulta, obs: Partial<Observacao>): Promise<Observacao | undefined> => {
    const helper = new CadastrarObservacaoHelper();

    try {
      const observacao = await helper.executar(consulta, obs);

      setConsultas([...consultas.map(consultas => {
        if (consultas.id === consulta.id) {
          consultas.observacoes?.push(observacao);
        }
        return consultas;
      })]);

      Notification.success({
        title: 'Observa????o cadastrada com sucesso',
        duration: 5000
      });

      return observacao;
    } catch (err) {
      Notification.error({
        title: 'N??o foi poss??vel cadastrar a observa????o na consulta',
        description: (err as Error).message,
        duration: 10000
      });
    }
  };

  const editarObservacao = async (consulta: Consulta, obs: Partial<Observacao>): Promise<Observacao | undefined> => {
    const helper = new EditarObservacaoHelper();

    try {
      const observacaoEditada = await helper.executar(obs);

      setConsultas([...consultas.map(consultas => {
        if (consultas.id === consulta.id) {
          consultas.observacoes = consultas.observacoes?.map(
            observacao => ((observacao.id === observacaoEditada.id) ? observacaoEditada : observacao)
          );
        }
        return consultas;
      })]);

      Notification.success({
        title: 'Observa????o salva com sucesso',
        duration: 5000
      });

      return observacaoEditada;
    } catch (err) {
      Notification.error({
        title: 'N??o foi poss??vel salva a observa????o da consulta',
        description: (err as Error).message,
        duration: 10000
      });
    }
  };

  const excluirObservacao = async (consulta: Consulta, obs: Observacao): Promise<Observacao | undefined> => {
    const helper = new ExcluirObservacaoHelper();

    try {
      const observacaoExcluida = await helper.executar(obs);

      setConsultas([...consultas.map(consultas => {
        if (consultas.id === consulta.id) {
          consultas.observacoes = consultas.observacoes?.filter(
            observacao => ((observacao.id !== observacaoExcluida.id))
          );
        }
        return consultas;
      })]);

      Notification.success({
        title: 'Observa????o exclu??da com sucesso',
        duration: 5000
      });

      return observacaoExcluida;
    } catch (err) {
      Notification.error({
        title: 'N??o foi poss??vel excluir a observa????o da consulta',
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
    return (!carregando) && ((layoutMeasurement.height + contentOffset.y) >= contentSize.height - 1);
  };

  const obterStatus = (): string => {
    const todasAsBuscas = filtrosDeBusca.busca?.finalizadas ?? false;
    if (consultasDoDia) {
      return 'Suas consultas agendadas para hoje';
    } else if (totalConsultas > 0) {
      const consultasRegistradas = totalConsultas > 1 ? 'consultas registradas' : 'consulta registrada';
      const consultasPendentesStr = totalConsultasAgendadas > 1 ? 'consultas pendentes' : 'consulta pendente';
      const atrasadasStr = totalConsultasAtrasadas > 1 ? 'atrasadas' : 'atrasada';

      if (todasAsBuscas) {
        return `Voc?? possui ${totalConsultas} ${consultasRegistradas}`;
      } else if (totalConsultasAtrasadas > 0) {
        return `Voc?? possui ${totalConsultasAgendadas} ${consultasPendentesStr} (${totalConsultasAtrasadas} ${atrasadasStr})`;
      } else {
        return `Voc?? possui ${totalConsultasAgendadas} ${consultasPendentesStr}`;
      }
    } else {
      return 'Voc?? n??o possui consultas registradas';
    }
  };

  const carregarTotaisConsultas = (): void => {
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
      setFiltrosDeBusca({ ...filtrosDeBusca });
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
          <ReagendarConsulta
            visivel={reagendarVisivel}
            setVisivel={setReagendarVisivel}
            formularioRef={reagendarConsultaRef}
            callback={reagendarConsulta}
          />
          <ReagendarEmConflito
            visivel={reagendarEmConflitoVisivel}
            setVisivel={setReagendarEmConflitoVisivel}
            mensagem={msgConsultaEmConflito}
            consulta={consultaEmConflito}
            callback={reagendarConsulta}
          />
          <Excluir
            visivel={excluirVisivel}
            setVisivel={setExcluirVisivel}
            formularioRef={excluirConsultaRef}
            callback={excluirConsulta}
          />
          <FinalizarReabrir
            visivel={finalizarReabrirVisivel}
            setVisivel={setFinalizarReabrirVisivel}
            formularioRef={finalizarReabrirConsultaRef}
            callbackFinalizar={finalizarConsulta}
            callbackReabrir={reabrirConsulta}
          />
          <Observacoes
            visivel={observacoesVisivel}
            setVisivel={setObservacoesVisivel}
            formularioRef={observacoesConsultaRef}
            callbackObservar={observarConsulta}
            callbackExcluir={excluirObservacao}
          />
          <Ordenar
            visivel={ordenarVisivel}
            setVisivel={setOrdenarVisivel}
            callback={reordenarConsultas}
            valorAtual={filtrosDeBusca.ordenacao}
            valoresDeBusca={[
              { titulo: 'Pela data de agendamento', valor: 'dataAgendada' },
              { titulo: 'Pelo n??mero da consulta', valor: 'id' }
            ]}
          />
          <MenuOpcoes
            visivel={paginaAtiva && !(
              buscarVisivel ||
              filtrarDatasVisivel ||
              ordenarVisivel ||
              reagendarVisivel ||
              excluirVisivel ||
              observacoesVisivel
            )}
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
        <Legenda/>
        {
          consultas.map((consulta, index) => <ConsultaCard
            key={index}
            reagendarFormularioRef={reagendarConsultaRef}
            excluirFormularioRef={excluirConsultaRef}
            observacoesFormularioRef={observacoesConsultaRef}
            finalizarReabrirFormularioRef={finalizarReabrirConsultaRef}
            consulta={consulta}
            ultimo={consultas.length - 1 === index}
          />)
        }
      </ScrollView>
  );
};

export default Consultas;
