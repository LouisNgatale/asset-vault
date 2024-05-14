import React from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import tw from '../../lib/tailwind.ts';
import ItemListCard from '../../components/item-list-card';
import ThemeText from '../../components/theme-text.tsx';
import screens from '../../constants/screens.ts';
import { UserType } from '../../constants';

export default function HomeScreen({ navigation }: any) {
  const items = [1, 2, 3, 4, 5, 6, 7];

  const handleNavigate = () => {
    navigation.navigate(screens.ItemView, {
      userType: UserType.OWNER,
    });
  };

  const renderItemList = () => {
    return <ItemListCard onPress={handleNavigate} />;
  };

  return (
    <SafeAreaView style={tw`flex-1 p-4`}>
      <View style={tw`p-4`}>
        <ThemeText style={tw`text-lg font-semibold`}>Your Assets</ThemeText>
        <FlatList data={items} renderItem={renderItemList} style={tw`mt-4`} />
      </View>
    </SafeAreaView>
  );
}
