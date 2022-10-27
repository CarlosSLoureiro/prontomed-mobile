import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Inicio from "@screens/Inicio";

const Stack = createStackNavigator();

const App = (): JSX.Element => {
  return (
    <NavigationContainer > 
      <Stack.Navigator screenOptions={{
            headerShown: false
      }}>
        <Stack.Screen name="Página Inicial" component={Inicio} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;