import { useRef } from 'react';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Pagina1, Pagina2, Pagina3, Pagina4 } from '@components/Apresentacao';

const Apresentacao = (): JSX.Element => {
  const pagerRef = useRef<PagerView>(null);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const alterarPagina = (pageNumber: number): void => {
    pagerRef?.current?.setPage(pageNumber);
  };

  return (
      <PagerView style={{ flex: 1 }} initialPage={0} ref={pagerRef}>
        <View key="0">
          <Pagina1 alterarPagina={alterarPagina}/>
        </View>
        <View key="1">
          <Pagina2 alterarPagina={alterarPagina}/>
        </View>
        <View key="2">
          <Pagina3 alterarPagina={alterarPagina}/>
        </View>
        <View key="3">
          <Pagina4 navigation={navigation} alterarPagina={alterarPagina}/>
        </View>
      </PagerView>
  );
};

export default Apresentacao;
