import React from 'react';
import { View } from 'react-native';
import ThemeText from '../theme-text.tsx';
import tw from '../../lib/tailwind.ts';
import ThemeButton from '../theme-button.tsx';
import { Deal } from '../../types/asset.ts';

export default function SupervisorApproval({
  nextStep,
}: {
  nextStep: () => void;
  previousStep: () => void;
  deal: Deal;
}) {
  return (
    <View>
      <View style={tw`flex flex-row items-center justify-between mb-3`}>
        <View>
          <ThemeText style={tw`font-semibold`}>Seller Signature</ThemeText>
        </View>
        <View>
          <ThemeText style={tw`font-semibold`}>Buyer Signature</ThemeText>
        </View>
      </View>

      <ThemeText style={tw`mb-3 text-justify`}>
        Signature for both buyer and seller Digital signature must be signed per
        agreement for both parties, this signature are encrypted make sure you
        cross check before submiting
      </ThemeText>

      <ThemeButton onPress={nextStep} label={'Proceed'} />
    </View>
  );
}
