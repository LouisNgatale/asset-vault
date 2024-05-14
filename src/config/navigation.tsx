import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screens from '../constants/screens.ts';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/setup-account';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MarketPlace from '../screens/market-place';
import Deals from '../screens/deals';
import { colors } from '../constants/colors.ts';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const BottomNavigation = () => {
  const bottomTabs = [
    {
      name: screens.Home,
      component: HomeScreen,
      options: {
        headerShown: false,
        tabBarLabel: 'My Assets',
        tabBarIcon: ({ color, size }: any) => (
          <Feather name="home" color={color} size={size} />
        ),
      },
    },
    {
      name: screens.MarketPlace,
      component: MarketPlace,
      options: {
        headerShown: false,
        tabBarLabel: 'Market Place',
        tabBarIcon: ({ color, size }: any) => (
          <Feather name="search" color={color} size={size} />
        ),
      },
    },
    {
      name: screens.Deals,
      component: Deals,
      options: {
        headerShown: false,
        tabBarLabel: 'Deals',
        tabBarIcon: ({ color, size }: any) => (
          <AntDesign name="folderopen" color={color} size={size} />
        ),
      },
    },
  ];

  return (
    <>
      <Tab.Navigator
        initialRouteName={screens.Home}
        screenOptions={{
          tabBarActiveTintColor: colors.orange,
        }}>
        {bottomTabs.map((screen) => (
          <Tab.Screen
            {...screen}
            name={screen.name}
            component={screen.component}
            key={screen.name}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};

export const AuthenticationScreens = () => {
  const unauthenticatedScreens = [
    {
      name: screens.LoginScreen,
      component: LoginScreen,
      options: {
        title: 'Login',
      },
    },
    {
      name: screens.RegistrationScreen,
      component: RegisterScreen,
      options: {
        title: 'Registration',
      },
    },
  ];

  return (
    <Stack.Navigator initialRouteName={screens.LoginScreen}>
      {unauthenticatedScreens.map((screen) => (
        <Stack.Screen
          {...screen}
          name={screen.name}
          component={screen.component}
          key={screen.name}
        />
      ))}
    </Stack.Navigator>
  );
};
