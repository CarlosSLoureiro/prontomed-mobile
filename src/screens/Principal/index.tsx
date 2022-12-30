import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import PagerView, { PagerViewOnPageSelectedEvent } from 'react-native-pager-view';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Menu from '@components/Menu';

import Ajustes from './Ajustes';
import Consultas from './Consultas';
import Inicio from './Inicio';
import Pacientes from './Pacientes';
import getStyles from './styles';

const Principal = (): JSX.Element => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const pagerRef = useRef<PagerView>(null);
  const [paginaSelecionada, setPaginaSelecionada] = useState(0);

  const alterarPagina = (pagina: number): void => pagerRef?.current?.setPage(pagina - 1);

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
        onPageSelected={(event: PagerViewOnPageSelectedEvent) => setPaginaSelecionada(event.nativeEvent.position)}
        ref={pagerRef}
      >
        <Inicio paginaAtiva={paginaSelecionada === 0} key="0"/>
        <Consultas paginaAtiva={paginaSelecionada === 1} key="1"/>
        <Pacientes paginaAtiva={paginaSelecionada === 2} key="2"/>
        <Ajustes key="3"/>
      </PagerView>
      <View style={styles.menu}>
        <Menu { ...{ alterarPagina } } />
      </View>
    </>
  );
};

export default Principal;
