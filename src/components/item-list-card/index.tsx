import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import ThemeText from '../theme-text.tsx';
import tw from '../../lib/tailwind.ts';
import Entypo from 'react-native-vector-icons/Entypo';
import { colors } from '../../constants/colors.ts';

function ItemListCard({ onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`w-full bg-white min-h-20 mb-3 rounded-md p-2 shadow-md`}>
      <View style={tw`min-h-20 bg-gray-100 mb-2 rounded-md`} />
      <View style={tw`flex flex-row justify-between mb-3`}>
        <ThemeText>Item</ThemeText>
        <ThemeText type="subtext">Sqm</ThemeText>
      </View>
      <View style={tw`flex flex-row gap-3 items-center`}>
        <Entypo name="location" size={20} color={colors.orange} />
        <ThemeText style={tw`font-bold`}>Location</ThemeText>
      </View>
    </TouchableOpacity>
  );
}

export default ItemListCard;
