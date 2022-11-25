import { NotifierWrapper } from 'react-native-notifier';
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Apresentacao from '@screens/Apresentacao';
import Principal from '@screens/Principal';

const Stack = createStackNavigator();

const App = (): JSX.Element => {
  return (
    <NotifierWrapper>
      <Provider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Apresentação" component={Apresentacao} />
            <Stack.Screen name="Início" component={Principal} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </NotifierWrapper>
  );
};

export default App;
