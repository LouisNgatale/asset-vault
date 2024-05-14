import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screens from './src/constants/screens.ts';
import BootstrapScreen from './src/screens/bootstrap';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={screens.BootstrapScreen}>
          <Stack.Screen
            options={{
              headerShown: false,
              animation: 'none',
            }}
            name={screens.BootstrapScreen}
            component={BootstrapScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
