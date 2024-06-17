import React from 'react';
import { View } from 'react-native';
import ThemeText from '../theme-text.tsx';
import tw from '../../lib/tailwind.ts';
import ThemeButton from '../theme-button.tsx';
import { Deal } from '../../types/asset.ts';

export default function ContractDrafting({
  nextStep,
  deal,
}: {
  nextStep: () => void;
  previousStep: () => void;
  deal: Deal;
}) {
  return (
    <View>
      <ThemeText style={tw`text-center mb-3`}>Contract PDF Preview</ThemeText>

      <ThemeButton onPress={nextStep} label={'Sign & Proceed'} />
    </View>
  );
}
