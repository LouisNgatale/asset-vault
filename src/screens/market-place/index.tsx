import React, { useRef, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import tw from '../../lib/tailwind.ts';
import { SearchBar } from '@rneui/themed';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../../constants/colors.ts';
import ItemListCard from '../../components/item-list-card';
import screens from '../../constants/screens.ts';
import { UserType } from '../../constants';

export default function MarketPlace({ navigation }: any) {
  const [search, setSearch] = useState('');
  const searchRef = useRef();

  const items = [1, 2, 3, 4, 5, 6, 7];

  const handleNavigate = () => {
    navigation.navigate(screens.ItemView, {
      userType: UserType.BUYER,
    });
  };

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  const renderItemList = () => {
    return <ItemListCard onPress={handleNavigate} />;
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

        <FlatList data={items} renderItem={renderItemList} style={tw`mt-4`} />
      </View>
    </SafeAreaView>
  );
}
