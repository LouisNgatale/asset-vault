import React, { useEffect, useState } from 'react';
import Emblem from '../../assets/svg/emblem';
import { View } from 'react-native';
import tw from '../../lib/tailwind.ts';
import {
  AuthenticationScreens,
  BottomNavigation,
} from '../../config/navigation.tsx';
import { useAppDispatch, useAppSelector } from '../../lib/hooks/useRedux.ts';
import { setAccessToken, setUserLoading } from '../../state/user/reducer.ts';
import { STORAGE_INFO } from '../../constants';
import { storage } from '../../state/storage.ts';

export default function BootstrapScreen(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const accessToken = useAppSelector(
    ({ user: { accessToken } }) => accessToken,
  );
  const isLoading = useAppSelector(({ user: { loading } }) => loading);

  useEffect(() => {
    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, [accessToken]);

  const setupApp = async () => {
    try {
      dispatch(setUserLoading(true));

      const storedAccessToken = storage.getString(STORAGE_INFO.TOKEN);

      dispatch(setAccessToken(storedAccessToken));

      dispatch(setUserLoading(false));
    } catch (e) {
      console.error(e);
      dispatch(setUserLoading(false));

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
      {accessToken && <BottomNavigation />}
      {!accessToken && <AuthenticationScreens />}
    </>
  );
}
