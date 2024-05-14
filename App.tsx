import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screens from './src/constants/screens.ts';
import BootstrapScreen from './src/screens/bootstrap';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}

export default App;
