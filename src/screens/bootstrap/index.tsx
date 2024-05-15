import React, { useEffect, useState } from 'react';
import Emblem from '../../assets/svg/emblem';
import { View } from 'react-native';
import tw from '../../lib/tailwind.ts';
import {
  AuthenticationScreens,
  BottomNavigation,
} from '../../config/navigation.tsx';

export default function BootstrapScreen(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setupApp = async () => {
    try {
      console.log('Setting app');
      setIsAuthenticated(false);
      setIsLoading(false);
    } catch (e) {
      console.error(e);

      // TODO: Show error message
    }
  };

  useEffect(() => {
    void setupApp();
  }, []);

  if (isLoading) {
    return (
      <View style={tw`flex flex-1 justify-center items-center`}>
        <Emblem />
      </View>
    );
  }

  return (
    <>
      {isAuthenticated && <BottomNavigation />}
      {!isAuthenticated && <AuthenticationScreens />}
    </>
  );
}
