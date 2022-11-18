import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import PagerView, { PagerViewOnPageSelectedEvent } from 'react-native-pager-view';
import Menu from "@components/Menu";
import getStyles from "./styles";
import Inicio from './Inicio';
import Consultas from './Consultas';
import Pacientes from './Pacientes';
import Ajustes from './Ajustes';
import { useState } from 'react';

const Principal = (): JSX.Element => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const pagerRef = useRef<PagerView>(null);
  const [paginaSelecionada, setPaginSelecionada] = useState(0);

  const alterarPagina = (pagina: number) => pagerRef?.current?.setPageWithoutAnimation(pagina - 1); // TODO alterar para setPage = https://github.com/callstack/react-native-pager-view/issues/636
  
  const styles = getStyles();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTintColor: styles.headerTitle.color,
      headerStyle: styles.header
    });
  });

  return (
    <>
      <PagerView
        style={styles.root}
        initialPage={0}
        scrollEnabled={false}
        onPageSelected={(event: PagerViewOnPageSelectedEvent) => setPaginSelecionada(event.nativeEvent.position)}
        ref={pagerRef}
      >
        <Inicio key="0"/>
        <Consultas paginaAtiva={paginaSelecionada === 1} key="1"/>
        <Pacientes key="2"/>
        <Ajustes key="3"/>
      </PagerView>
      <View style={styles.menu}>
        <Menu { ...{alterarPagina} } />
      </View>
    </>
  );
};

export default Principal;