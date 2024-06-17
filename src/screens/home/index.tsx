import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import tw from '../../lib/tailwind.ts';
import ItemListCard from '../../components/item-list-card';
import ThemeText from '../../components/theme-text.tsx';
import screens from '../../constants/screens.ts';
import { UserType } from '../../constants';
import { fetchAssets } from '../../state/asset/actions.ts';
import { useAppDispatch } from '../../lib/hooks/useRedux.ts';
import { Asset } from '../../types/asset.ts';

export default function HomeScreen({ navigation }: any) {
  const dispatch = useAppDispatch();
  const [assets, setAssets] = useState<Asset[]>([]);

  const handleNavigate = (asset: Asset) => () => {
    navigation.navigate(screens.ItemView, {
      userType: UserType.OWNER,
      asset,
    });
  };

  useEffect(() => {
    void fetchAllOwnerAssets();
  }, []);

  const fetchAllOwnerAssets = async () => {
    try {
      const response = await dispatch(fetchAssets()).unwrap();

      setAssets(response.data);
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
