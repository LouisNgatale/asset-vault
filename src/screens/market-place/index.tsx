import React, { useRef, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import tw from '../../lib/tailwind.ts';
import { SearchBar } from '@rneui/themed';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../../constants/colors.ts';
import ItemListCard from '../../components/item-list-card';

export default function MarketPlace() {
  const [search, setSearch] = useState('');
  const searchRef = useRef();

  const items = [1, 2, 3, 4, 5, 6, 7];

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  return (
    <SafeAreaView style={tw`flex-1 p-4`}>
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

      <FlatList data={items} renderItem={ItemListCard} style={tw`px-4 mt-4`} />
    </SafeAreaView>
  );
}
