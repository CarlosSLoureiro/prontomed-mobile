import React, { useRef } from 'react';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';
import Menu from "@components/Menu";
import getStyles from "./styles";
import Inicio from './Inicio';
import Consultas from './Consultas';
import Pacientes from './Pacientes';
import Ajustes from './Ajustes';

const Principal = (): JSX.Element => {
  const pagerRef = useRef<PagerView>(null);

  const styles = getStyles();

  const alterarPagina = (pageNumber:number):number => {
    pagerRef?.current?.setPageWithoutAnimation(pageNumber);
    return pageNumber;
  };

  return (
    <>
      <PagerView style={styles.root} initialPage={0} scrollEnabled={false} ref={pagerRef}>
        <View style={styles.content} key="1">
          <Inicio />
        </View>
        <View style={styles.content} key="2">
          <Consultas />
        </View>
        <View style={styles.content} key="3">
          <Pacientes />
        </View>
        <View style={styles.content} key="4">
          <Ajustes />
        </View>
      </PagerView>
      <View style={styles.menu}>
        <Menu alterarPagina={alterarPagina} />
      </View>
    </>
  );
};

export default Principal;