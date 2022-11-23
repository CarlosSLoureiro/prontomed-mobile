import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import Icon from "react-native-dynamic-vector-icons";
import getMainStyles from "../styles";
import { ConsultaCardContrato } from '@components/Consulta/Card/types';
import { ConsultasContrato, BuscaContrato, DatasContrato, OrdenacaoContrato, FiltrosDeBuscaContrato } from './types';
import ConsultaCard from '@components/Consulta/Card';
import items from './items';
import Notification from '@utils/Notification';
import { NotifierComponents } from 'react-native-notifier';
import { Portal } from 'react-native-paper';
import Ordenar from '@components/Consulta/Dialogs/Ordenar';
import Opcoes from '@components/Consulta/Opcoes';
import Buscar from '@components/Consulta/Dialogs/Buscar';
import FiltrarDatas from '@components/Consulta/Dialogs/FiltrarDatas';

const Consultas = ({
  paginaAtiva
}:ConsultasContrato): JSX.Element => {
    const styles = getMainStyles();
    const [consultas, setConsultas] = useState<Array<ConsultaCardContrato>>(items);
    const scrollRef = useRef<ScrollView>(null);
    const [buscarVisivel, setBuscarVisivel] = useState(false);
    const [filtrarDatasVisivel, setFiltrarDatasVisivel] = useState(false);
    const [ordenarVisivel, setOrdenarVisivel] = useState(false);
    const filtrosDeBuscaInicial:FiltrosDeBuscaContrato = {
      ordenacao: {
        ordem: "decrescente",
        chave: "data"
      } 
    };
    const [filtrosDeBusca, setFiltrosDeBusca] = useState<FiltrosDeBuscaContrato>(filtrosDeBuscaInicial);

    useEffect(()=>{
      // TODO: atualizar resultados
      console.log('Deve buscar consultas ->', filtrosDeBusca);
      Notification.info({
        title: 'Deve buscar consultas',
        description: JSON.stringify(filtrosDeBusca)
      });
    },[filtrosDeBusca]);

    const sobirScrollParaOTopo = () => {
      scrollRef?.current?.scrollTo({
        y: 0,
        animated: true,
      });
    }

    const buscarConsultas = (busca:BuscaContrato) => {
      setFiltrosDeBusca({
        ...filtrosDeBusca,
        ...{busca}
      });
    }

    const filtrarDatasConsultas = (datas:DatasContrato) => {
      setFiltrosDeBusca({
        ...filtrosDeBusca,
        ...{datas}
      });
    }

    const reordenarConsultas = (ordenacao:OrdenacaoContrato) => {
      setFiltrosDeBusca({
        ...filtrosDeBusca,
        ...{ordenacao}
      });
    }

    /* @ts-ignore */
    const deveCarregarMais = ({layoutMeasurement, contentOffset, contentSize}) => {
      return layoutMeasurement.height + contentOffset.y >= contentSize.height;
    };

    const carregarConsultas = async () => {
      console.log('deve carregar >>>');
      if (consultas.length < 15) {
        Promise.resolve(
          setConsultas([...consultas, ...[{
            nome: `carlos loureiro #${consultas.length}`
          },
          {
            nome: `jessie #${consultas.length}`
          }]])
        );
      } else {
        Notification.add({
          title: 'Não há mais consultas',
          description: 'Tente alterar os filtros de busca',
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'error',
          },
          duration: 5000,
        });
      }
    }

    if (!paginaAtiva) {
      sobirScrollParaOTopo();
    }

    return (
      <ScrollView scrollEventThrottle={400}
        onScroll={async ({nativeEvent}) => {
          if(deveCarregarMais(nativeEvent)){
            await carregarConsultas();
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
    )
};

export default Consultas;