import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import ThemeText from '../theme-text.tsx';
import tw from '../../lib/tailwind.ts';
import Entypo from 'react-native-vector-icons/Entypo';
import { colors } from '../../constants/colors.ts';

function ItemListCard({ onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`w-full bg-white min-h-20 mb-3 rounded-md p-2 shadow-md`}>
      <Image
        source={{
          uri: 'https://plus.unsplash.com/premium_photo-1684348962187-988fc3d7f024?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
        style={{
          height: 300,
          justifyContent: 'center',
          borderRadius: 6,
          marginBottom: 6,
        }}
      />
      <View style={tw`flex flex-row justify-between mb-3`}>
        <ThemeText>Land</ThemeText>
        <ThemeText type="subtext">1,000 Sqm</ThemeText>
      </View>
      <View style={tw`flex flex-row gap-3 items-center mb-3`}>
        <Entypo name="location" size={20} color={colors.orange} />
        <ThemeText style={tw`font-semibold`}>Mbezi Beach makonde</ThemeText>
      </View>
    </TouchableOpacity>
  );
}

export default ItemListCard;
