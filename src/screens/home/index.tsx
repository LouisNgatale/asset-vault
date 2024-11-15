import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import tw from '../../lib/tailwind.ts';
import ItemListCard from '../../components/item-list-card';
import ThemeText from '../../components/theme-text.tsx';
import screens from '../../constants/screens.ts';
import { UserType } from '../../constants';
import { fetchAssets } from '../../state/asset/actions.ts';
import { useAppDispatch, useAppSelector } from '../../lib/hooks/useRedux.ts';
import { Asset } from '../../types/asset.ts';
import { ViewType } from '../item-view';
import { isEmpty } from 'lodash';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { setAccessToken } from '../../state/user/reducer.ts';
import { storage } from '../../state/storage.ts';

export default function HomeScreen({ navigation }: any) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const user = useAppSelector(({ user: { user } }) => user);
  const assets = useAppSelector(({ assets: { assets } }) => assets);

  const handleNavigate = (asset: Asset) => () => {
    navigation.navigate(screens.ItemView, {
      userType:
        asset.owner.uuid === user.uuid ? UserType.OWNER : UserType.BUYER,
      asset,
      viewType: ViewType.MARKET_PLACE,
    });
  };

  useEffect(() => {
    fetchAllOwnerAssets();
  }, []);

  const fetchAllOwnerAssets = async () => {
    setLoading(true);
    try {
      await dispatch(fetchAssets()).unwrap();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const renderItemList = ({ item }: { item: Asset }) => {
    return <ItemListCard onPress={handleNavigate} asset={item} />;
  };

  const handleLogout = () => {
    storage.clearAll();
    dispatch(setAccessToken(undefined));
  };

  return (
    <SafeAreaView style={tw`h-full p-4`}>
      <View style={tw`p-4 h-full`}>
        <ThemeText style={tw`text-lg mb-2`} type="subtext">
          Habari, {user.fullName}
        </ThemeText>
        <View style={tw`flex flex-row justify-between items-center`}>
          <ThemeText style={tw`text-lg font-semibold`}>Your Assets</ThemeText>

          <TouchableOpacity onPress={handleLogout}>
            <MaterialIcons name="logout" size={25} />
          </TouchableOpacity>
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={fetchAllOwnerAssets}
            />
          }>
          {!isEmpty(assets) &&
            assets.map((asset) => renderItemList({ item: asset }))}

          {isEmpty(assets) && (
            <ThemeText style={tw`text-center mt-3`}>
              There's no assets listed at the marketplace at the moment, please
              check in later.
            </ThemeText>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
