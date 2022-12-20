import { ScrollView, View } from 'react-native';

import Item from '@components/Ajustes/Item';

import getMainStyles from '../styles';

import items from './items';

const Ajustes = (): JSX.Element => {
  const styles = getMainStyles();

  return (
      <ScrollView scrollEventThrottle={400} contentContainerStyle={styles.conteudo}>
        <View style={{ marginTop: 50 }}>
          {
            items.map((item, index) => <Item key={index} {... item} />)
          }
        </View>
      </ScrollView>
  );
};

export default Ajustes;
