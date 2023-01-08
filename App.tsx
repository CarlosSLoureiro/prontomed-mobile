import 'reflect-metadata';

import { LogBox, StatusBar } from 'react-native';
import { NotifierWrapper } from 'react-native-notifier';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { DatabaseProvider } from '@database';

import ThemeScheme from '@utils/ThemeScheme';

import Apresentacao from '@screens/Apresentacao';
import Principal from '@screens/Principal';

LogBox.ignoreLogs([
  'Require cycle:',
  'Sending `onAnimatedValueUpdate` with no listeners registered.'
]);

const Stack = createStackNavigator();

const App = (): JSX.Element => {
  return (
    <DatabaseProvider>
      <NotifierWrapper>
        <PaperProvider theme={ThemeScheme.getTheme()}>
          <StatusBar
            backgroundColor={ThemeScheme.isDarkModeScheme() ? 'black' : 'white'}
            barStyle={ThemeScheme.isDarkModeScheme() ? 'light-content' : 'dark-content'}
          />
          <NavigationContainer>
            <Stack.Navigator screenOptions={{
              headerShown: false,
              headerTitleAlign: 'center'
            }}>
              <Stack.Screen name="Apresentação" component={Apresentacao} />
              <Stack.Screen name="Início" component={Principal} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </NotifierWrapper>
    </DatabaseProvider>
  );
};

export default App;
