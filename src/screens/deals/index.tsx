import React from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import ThemeText from '../../components/theme-text.tsx';
import tw from '../../lib/tailwind.ts';
import screens from '../../constants/screens.ts';

export default function Deals({ navigation }: { navigation: any }) {
  const handleNavigateToActiveDeal = (dealId: number) => () => {
    console.log({ dealId });
    navigation.navigate(screens.ActiveDeal);
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={tw`p-3`}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((deal) => (
          <TouchableOpacity
            onPress={handleNavigateToActiveDeal(deal)}
            style={tw`w-full rounded-md bg-white mb-3 p-3 flex flex-row gap-3`}>
            <View style={tw`h-[80px] w-[80px] bg-gray-200`}>
              <ThemeText>Image view</ThemeText>
            </View>
            <View>
              <ThemeText>Deal card</ThemeText>
              <ThemeText type="subtext">Asset location description</ThemeText>
              <ThemeText type="subtext">Asset valuation</ThemeText>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
