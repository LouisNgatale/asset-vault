import React, { useEffect, useRef, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import tw from '../../lib/tailwind.ts';
import { SearchBar } from '@rneui/themed';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../../constants/colors.ts';
import ItemListCard from '../../components/item-list-card';
import screens from '../../constants/screens.ts';
import { UserType } from '../../constants';
import { Asset } from '../../types/asset.ts';
import ThemeText from '../../components/theme-text.tsx';
import { isEmpty } from 'lodash';
import { fetchMarketplace } from '../../state/asset/actions.ts';
import { useAppDispatch, useAppSelector } from '../../lib/hooks/useRedux.ts';
import { ViewType } from '../item-view';

export default function MarketPlace({ navigation }: any) {
  const [search, setSearch] = useState('');
  const searchRef = useRef();
  const [assets, setAssets] = useState<Asset[]>([]);
  const dispatch = useAppDispatch();

  const user = useAppSelector(({ user: { user } }) => user);

  const handleNavigate = (asset: Asset) => () => {
    navigation.navigate(screens.ItemView, {
      userType:
        asset.owner.uuid === user.uuid ? UserType.OWNER : UserType.BUYER,
      asset,
      viewType: ViewType.MARKET_PLACE,
    });
  };

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  const renderItemList = ({ item }: { item: Asset }) => {
    return <ItemListCard onPress={handleNavigate} asset={item} />;
  };

  useEffect(() => {
    void fetchMarketplaceAssets();
  }, []);

  const fetchMarketplaceAssets = async () => {
    try {
      const response = await dispatch(fetchMarketplace()).unwrap();

      if (response.data) {
        setAssets(response.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 p-4`}>
      <View style={tw`p-4`}>
        <SearchBar
          lightTheme={true}
          ref={searchRef}
          searchIcon={<Feather name="search" color={colors.orange} size={20} />}
          round
          placeholder={'What are you looking for?'}
          containerStyle={tw`bg-transparent border-b-0 border-t-0 p-2 shadow-0`}
          inputContainerStyle={tw`bg-white border-b-[1.4px] border-[1.4px] border-primary-100 h-auto`}
          onChangeText={updateSearch}
          value={search}
        />

        {!isEmpty(assets) && (
          <FlatList
            data={assets}
            renderItem={renderItemList}
            style={tw`mt-4`}
          />
        )}

        {isEmpty(assets) && (
          <ThemeText style={tw`text-center mt-3`}>
            There's no assets listed at the marketplace at the moment, please
            check in later.
          </ThemeText>
        )}
      </View>
    </SafeAreaView>
  );
}
