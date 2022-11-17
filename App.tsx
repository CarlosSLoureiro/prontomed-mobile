import React from "react";
import { NotifierWrapper } from 'react-native-notifier';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Apresentacao from "@screens/Apresentacao";
import Principal from "@screens/Principal";

const Stack = createStackNavigator();

const App = (): JSX.Element => {
  return (
    <NotifierWrapper>
      <NavigationContainer> 
        <Stack.Navigator screenOptions={{
              headerShown: false
        }}>
          <Stack.Screen name="Apresentação" component={Apresentacao} />
          <Stack.Screen name="Início" component={Principal} />
        </Stack.Navigator>
      </NavigationContainer>
    </NotifierWrapper>
  );
};

export default App;