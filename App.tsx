import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Apresentacao from "@screens/Apresentacao";
import Inicio from "@screens/Inicio";

const Stack = createStackNavigator();

const App = (): JSX.Element => {
  return (
    <NavigationContainer > 
      <Stack.Navigator screenOptions={{
            headerShown: false
      }}>
        <Stack.Screen name="Apresentação" component={Apresentacao} />
        <Stack.Screen name="Início" component={Inicio} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;