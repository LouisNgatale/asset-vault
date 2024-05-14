import React from 'react';
import tw from '../../lib/tailwind.ts';
import { SafeAreaView, View } from 'react-native';
import ThemeText from '../../components/theme-text.tsx';
import ThemeInput from '../../components/input';
import ThemeButton from '../../components/theme-button.tsx';

const formFieldValues = {
  nidaNumber: 'nidaNumber',
};

export default function ListAsset() {
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`p-4`}>
        <ThemeText style={tw`mb-2 text-justify mb-5`}>
          You're listing your asset to market for sale. Once this asset is on
          the market. Please enter the details below so that your asset to be
          listed on the market.
        </ThemeText>

        <ThemeInput
          name={formFieldValues.nidaNumber}
          rules={{}}
          placeholder={'Enter the price for your asset'}
          errors={[]}
          label="Listing Price:"
          keyboardType="numeric"
        />

        <ThemeButton onPress={() => {}} label="List to Market" />
      </View>
    </SafeAreaView>
  );
}
