import React from 'react';
import { View } from 'react-native';
import ThemeText from '../theme-text.tsx';
import tw from '../../lib/tailwind.ts';
import { Deal } from '../../types/asset.ts';

export default function TitleIssuance({
  nextStep,
  deal,
}: {
  nextStep: () => void;
  previousStep: () => void;
  deal: Deal;
}) {
  return (
    <View>
      <ThemeText>
        Once all the payments are done, you will be issued with the title deed
      </ThemeText>

      <View style={tw`flex flex-row gap-2 mt-3`}>
        <ThemeText>Paid Amount:</ThemeText>
        <ThemeText style={tw`font-semibold`}>Tsh 0</ThemeText>
      </View>

      <View style={tw`flex flex-row gap-2`}>
        <ThemeText>Pending Amount:</ThemeText>
        <ThemeText style={tw`font-semibold`}>Tsh 1,000,000/=</ThemeText>
      </View>

      {/* Enter amount to be paid */}
    </View>
  );
}
