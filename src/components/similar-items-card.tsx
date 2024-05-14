import React from 'react';
import { View } from 'react-native';
import ThemeText from './theme-text.tsx';
import tw from '../lib/tailwind.ts';
import Entypo from 'react-native-vector-icons/Entypo';

export default function SimilarItemCard() {
  return (
    <View
      style={tw`flex flex-row gap-3 items-center p-2 mr-3 bg-gray-200 rounded-md`}>
      <View style={tw`w-30 h-25 bg-white rounded-md`} />

      <View>
        <ThemeText type="subtext">Land</ThemeText>

        <View style={tw`flex flex-row gap-3 items-center mb-3`}>
          <Entypo name="location" size={20} />
          <ThemeText style={tw`font-bold`}>Location</ThemeText>
        </View>

        <ThemeText style={tw`font-light`}>Size</ThemeText>
        <ThemeText>Tzs 120,000,000/=</ThemeText>
      </View>
    </View>
  );
}
