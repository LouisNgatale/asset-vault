import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screens from './src/constants/screens.ts';
import BootstrapScreen from './src/screens/bootstrap';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ItemView from './src/screens/item-view';
import ListAsset from './src/screens/list-asset';
import store, { persistor } from './src/state/store.ts';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ActiveDeal from './src/screens/deals/active-deal.tsx';
import PdfViewer from './src/components/pdf-viewer';

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
    {
      name: screens.ActiveDeal,
      component: ActiveDeal,
      options: {
        title: 'Active Deal',
      },
    },
    {
      name: screens.PdfViewer,
      component: PdfViewer,
      options: {
        title: 'Preview PDF',
      },
    },
  ];

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
