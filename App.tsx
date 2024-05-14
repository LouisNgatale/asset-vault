import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screens from './src/constants/screens.ts';
import BootstrapScreen from './src/screens/bootstrap';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ItemView from './src/screens/item-view';
import ListAsset from './src/screens/list-asset';

const RootStack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const globalRoutes = [
    {
      name: screens.ItemView,
      component: ItemView,
      options: {
        title: 'Asset View',
      },
    },
    {
      name: screens.ListAsset,
      component: ListAsset,
      options: {
        title: 'List Asset for Sale',
      },
    },
  ];

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName={screens.BootstrapScreen}>
          <RootStack.Screen
            options={{
              headerShown: false,
              animation: 'none',
            }}
            name={screens.BootstrapScreen}
            component={BootstrapScreen}
          />
          <RootStack.Group>
            {globalRoutes.map((screen) => (
              <RootStack.Screen
                {...screen}
                options={{
                  ...screen.options,
                  headerBackTitleVisible: false,
                }}
                name={screen.name}
                component={screen.component}
              />
            ))}
          </RootStack.Group>
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
