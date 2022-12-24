import { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Pagina1, Pagina2, Pagina3, Pagina4 } from '@components/Apresentacao';

const Apresentacao = (): JSX.Element => {
  const pagerRef = useRef<PagerView>(null);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [display, setDisplay] = useState<'none' | 'flex' | undefined>('none');

  useEffect(() => {
    void (async () => {
      const apresentacao = await AsyncStorage.getItem('ProntoMed:APRESENTAÇÃO');
      if (apresentacao === 'true') {
        navigation?.replace('Início');
      } else {
        setDisplay('flex');
      }
    })();
  });

  const alterarPagina = useCallback((pageNumber: number): void => {
    pagerRef?.current?.setPage(pageNumber);
  }, []);

  return (
      <PagerView style={{ flex: 1, display }} initialPage={0} ref={pagerRef}>
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
