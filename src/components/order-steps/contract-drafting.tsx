import React from 'react';
import { View } from 'react-native';
import ThemeText from '../theme-text.tsx';
import tw from '../../lib/tailwind.ts';
import ThemeButton from '../theme-button.tsx';

export default function ContractDrafting({
  nextStep,
}: {
  nextStep: () => void;
  previousStep: () => void;
}) {
  return (
    <View>
      <ThemeText style={tw`text-center mb-3`}>Contract PDF Preview</ThemeText>

      <ThemeButton onPress={nextStep} label={'Sign & Proceed'} />
    </View>
  );
}
