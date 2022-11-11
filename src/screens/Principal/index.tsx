import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import PagerView from 'react-native-pager-view';
import Menu from "@components/Menu";
import getStyles from "./styles";
import Inicio from './Inicio';
import Consultas from './Consultas';
import Pacientes from './Pacientes';
import Ajustes from './Ajustes';

const Principal = (): JSX.Element => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const pagerRef = useRef<PagerView>(null);

  const alterarPagina = (pagina: number) => pagerRef?.current?.setPageWithoutAnimation(pagina - 1); // TODO alterar para setPage = https://github.com/callstack/react-native-pager-view/issues/636

  useEffect(() => {
    navigation.setOptions({
      headerShown: true
    });
  });

  const styles = getStyles();

  return (
    <>
      <PagerView style={styles.root} initialPage={0} scrollEnabled={false} ref={pagerRef}>
        <Inicio key="1" />
        <Consultas key="2"/>
        <Pacientes key="3"/>
        <Ajustes key="4"/>
      </PagerView>
      <View style={styles.menu}>
        <Menu alterarPagina={alterarPagina} />
      </View>
    </>
  );
};

export default Principal;