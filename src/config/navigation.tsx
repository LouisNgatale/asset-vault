import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screens from '../constants/screens.ts';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';

const Stack = createNativeStackNavigator();

export const BottomNavigation = () => {
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
