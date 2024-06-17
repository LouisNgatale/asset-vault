import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import tw from '../../lib/tailwind.ts';
import ItemListCard from '../../components/item-list-card';
import ThemeText from '../../components/theme-text.tsx';
import screens from '../../constants/screens.ts';
import { UserType } from '../../constants';
import { fetchAssets } from '../../state/asset/actions.ts';
import { useAppDispatch, useAppSelector } from '../../lib/hooks/useRedux.ts';
import { Asset } from '../../types/asset.ts';
import { ViewType } from '../item-view';

export default function HomeScreen({ navigation }: any) {
  const dispatch = useAppDispatch();

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
    try {
      await dispatch(fetchAssets()).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  const renderItemList = ({ item }: { item: Asset }) => {
    return <ItemListCard onPress={handleNavigate} asset={item} />;
  };

  return (
    <SafeAreaView style={tw`flex-1 p-4`}>
      <View style={tw`p-4`}>
        <ThemeText style={tw`text-lg font-semibold`}>Your Assets</ThemeText>
        <FlatList data={assets} renderItem={renderItemList} style={tw`mt-4`} />
      </View>
    </SafeAreaView>
  );
}
