import { useEffect, useRef, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { Portal } from 'react-native-paper';

import Consulta from '@entity/Consulta';
import Paciente from '@entity/Paciente';
import { FiltrosDeBuscarPacientesContrato, OrdenacaoPacientesContrato } from '@repository/Pacientes/types';

import AgendarConsultasHelper from '@helpers/Consultas/Agendar';
import CadastrarPacientesHelper from '@helpers/Pacientes/Cadastrar';
import EditarPacientesHelper from '@helpers/Pacientes/Editar';
import ExcluirPacientesHelper from '@helpers/Pacientes/Excluir';
import ListarPacientesHelper from '@helpers/Pacientes/Listar';
import ObterTotalPacientesHelper from '@helpers/Pacientes/ObterTotal';

import Notification from '@hooks/useNotification';

import PacienteCard from '@components/Paciente/Card';
import AgendarConsulta from '@components/Paciente/Dialogs/AgendarConsulta';
import Buscar from '@components/Paciente/Dialogs/Buscar';
import { BuscarPacienteCallbackContrato } from '@components/Paciente/Dialogs/Buscar/types';
import CadastrarEditar from '@components/Paciente/Dialogs/CadastrarEditar';
import Excluir from '@components/Paciente/Dialogs/Excluir';
import Ordenar from '@components/Paciente/Dialogs/Ordenar';
import Opcoes from '@components/Paciente/Opcoes';

import getMainStyles from '../styles';

import { agendaraConsultaCallback, cadastrarEditarCallback, excluirCallback, PacientesContrato } from './types';

const Pacientes = ({
  paginaAtiva
}: PacientesContrato): JSX.Element => {
  const styles = getMainStyles();
  const [carregando, setCarregando] = useState(false);
  const [pacientes, setPacientes] = useState<Array<Paciente>>([]);
  const [pacientesPagina, setPacientesPagina] = useState(0);
  const [totalPacientes, setTotalPacientes] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const filtrosDeBuscaInicial: FiltrosDeBuscarPacientesContrato = {
    ordenacao: {
      ordem: 'decrescente',
      chave: 'pacientes.id'
    }
  };
  const [filtrosDeBusca, setFiltrosDeBusca] = useState<FiltrosDeBuscarPacientesContrato>(filtrosDeBuscaInicial);
  const [buscarVisivel, setBuscarVisivel] = useState(false);
  const [cadastrarVisivel, setCadastrarVisivel] = useState(false);
  const [ordernarVisivel, setOrdernarVisivel] = useState(false);

  const agendarConsultaRef = useRef<any>();
  const cadastrarEditarPacienteRef = useRef<any>();
  const excluirPacienteRef = useRef<any>();

  const carregarTotalPacientes = async (): Promise<void> => {
    const helper = new ObterTotalPacientesHelper();
    const total = await helper.executar();
    setTotalPacientes(total);
  };

  const carregarPacientes = async (deveResetar = false): Promise<void> => {
    const helper = new ListarPacientesHelper();

    try {
      const listagemAtual = deveResetar ? [] : pacientes;
      const paginaAtual = deveResetar ? 0 : pacientesPagina;

      const pacientesCarregados = await helper.executar(paginaAtual, filtrosDeBusca);

      if (pacientesCarregados.length) {
        /* funde os resultados */
        const listagem = [...listagemAtual, ...pacientesCarregados.filter(pacienteCarregado => {
          return !listagemAtual.some(paciente => paciente.id === pacienteCarregado.id);
        })];

        setPacientes(listagem);
        setPacientesPagina(paginaAtual + 1);
      } else if (!totalPacientes) {
        Notification.info({
          title: 'Não há pacientes cadastrados',
          duration: 5000
        });
      } else if (paginaAtual > 0) {
        Notification.info({
          title: 'Não há mais pacientes',
          description: 'Tente alterar os filtros de busca',
          duration: 5000
        });
      } else {
        setPacientes([]);
        Notification.info({
          title: 'Não há pacientes',
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

  const cadastrarPaciente: cadastrarEditarCallback = async (dados: Partial<Paciente>): Promise<Paciente | undefined> => {
    const helper = new CadastrarPacientesHelper();

    try {
      const paciente = await helper.executar(dados);

      Notification.success({
        title: `O paciente ${paciente.nome} foi cadastrado`,
        duration: 10000
      });

      setPacientes([...[paciente], ...pacientes]);
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

  const editarPaciente: cadastrarEditarCallback = async (dados: Partial<Paciente>): Promise<Paciente | undefined> => {
    const helper = new EditarPacientesHelper();

    try {
      const pacienteEditado = await helper.executar(dados);

      Notification.success({
        title: `Paciente ${pacienteEditado.nome} atualizado`,
        duration: 10000
      });

      setPacientes([...pacientes.map(paciente => ((paciente.id === pacienteEditado.id) ? pacienteEditado : paciente))]);

      return pacienteEditado;
    } catch (err) {
      Notification.error({
        title: 'Não foi possível atualizar o paciente',
        description: (err as Error).message,
        duration: 10000
      });
    }
  };

  const excluirPaciente: excluirCallback = async (paciente: Paciente): Promise<Paciente | undefined> => {
    const helper = new ExcluirPacientesHelper();

    try {
      const pacienteExcluido = await helper.executar(paciente);

      setPacientes([...pacientes.filter(pacientes => (pacientes.id !== pacienteExcluido.id))]);
      setTotalPacientes(totalPacientes - 1);

      Notification.info({
        title: `Paciente ${pacienteExcluido.nome} foi excluído (a)`,
        duration: 10000
      });
      return pacienteExcluido;
    } catch (err) {
      Notification.error({
        title: 'Não foi possível excluir o (a) paciente',
        description: (err as Error).message,
        duration: 10000
      });
    }
  };

  const agendarConsulta: agendaraConsultaCallback = async (paciente: Paciente, data: Date): Promise<Consulta | undefined> => {
    const helper = new AgendarConsultasHelper();

    try {
      const consulta = await helper.executar(paciente, data);

      setPacientes([...pacientes.map(p => {
        if (p.id === paciente.id) {
          p.consultas?.push(consulta);
          return p;
        } else {
          return p;
        }
      })]);

      Notification.success({
        title: `Consulta nº ${consulta.id} agendada com sucesso`,
        duration: 10000
      });
      return consulta;
    } catch (err) {
      Notification.error({
        title: 'Não foi possível agendar a consulta',
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

  const deveCarregarMais = ({ layoutMeasurement, contentOffset, contentSize }: any): boolean => {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return (!carregando) && ((layoutMeasurement.height + contentOffset.y) >= contentSize.height);
  };

  const buscarPacientes = (busca?: BuscarPacienteCallbackContrato): void => {
    setFiltrosDeBusca({
      ...filtrosDeBusca,
      ...{ busca }
    });
  };

  const reordenarPacientes = (ordenacao: OrdenacaoPacientesContrato): void => {
    setFiltrosDeBusca({
      ...filtrosDeBusca,
      ...{ ordenacao }
    });
  };

  useEffect(() => {
    sobirScrollParaOTopo();
    void carregarTotalPacientes();
    void carregarPacientes(true);
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
              await carregarPacientes()
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
            callback={buscarPacientes}
            valorAtual={filtrosDeBusca.busca}
          />
          <AgendarConsulta
            formularioRef={agendarConsultaRef}
            callback={agendarConsulta}
          />
          <CadastrarEditar
            formularioRef={cadastrarEditarPacienteRef}
            visivel={cadastrarVisivel} setVisivel={setCadastrarVisivel}
            cadastrarCallback={cadastrarPaciente}
            editarCallback={editarPaciente}
          />
          <Excluir
            formularioRef={excluirPacienteRef}
            callback={excluirPaciente}
          />
          <Ordenar
            visivel={ordernarVisivel} setVisivel={setOrdernarVisivel} callback={reordenarPacientes}
            valorAtual={filtrosDeBusca.ordenacao}
            valoresDeBusca={[
              { titulo: 'Pelo nome do paciente', valor: 'pacientes.nome' },
              { titulo: 'Pela idade do paciente', valor: 'pacientes.idade' },
              { titulo: 'Pelo peso do paciente', valor: 'pacientes.peso' },
              { titulo: 'Pela altura do paciente', valor: 'pacientes.altura' },
              { titulo: 'Pela número do paciente', valor: 'pacientes.id' },
              { titulo: 'Pela número de consultas', valor: 'totalConsultas' }
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
          pacientes.map((paciente, index) => <PacienteCard
            key={index}
            agendarFormularioRef={agendarConsultaRef}
            editarFormularioRef={cadastrarEditarPacienteRef}
            excluirFormularioRef={excluirPacienteRef}
            paciente={paciente}
            ultimo={pacientes.length - 1 === index}
          />)
        }
      </ScrollView>
  );
};

export default Pacientes;
