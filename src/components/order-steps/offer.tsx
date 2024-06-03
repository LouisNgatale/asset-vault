import React, { useState } from 'react';
import { View } from 'react-native';
import ThemeText from '../theme-text.tsx';
import tw from '../../lib/tailwind.ts';
import { useForm } from 'react-hook-form';
import { LoginDto } from '../../state/user/types.ts';
import ThemeInput from '../input';
import Dropdown from '../dropdown';
import { PaymentType } from '../../constants';
import ThemeButton from '../theme-button.tsx';

const formFieldValues = {
  price: 'price',
};

export default function Offer({
  nextStep,
}: {
  nextStep: () => void;
  previousStep: () => void;
}) {
  const { control } = useForm<LoginDto>({
    defaultValues: {
      phoneNumber: 0,
      NIDA: 0,
    },
  });
  const [paymentType, setPaymentType] = useState();

  const paymentTypes = [
    {
      label: 'Lampsum',
      value: PaymentType.LAMPSUM,
    },
    {
      label: 'Installment',
      value: PaymentType.INSTALLMENT,
    },
  ];

  return (
    <View>
      <ThemeText style={tw`text-center font-semibold mb-3`}>
        Propose offer price
      </ThemeText>

      <ThemeInput
        name={formFieldValues.price}
        rules={{}}
        placeholder={'Enter your proposed price'}
        errors={[]}
        label="Proposed buying price"
        control={control}
        keyboardType="numeric"
        maxLength={20}
        returnKeyType="done"
      />

      <Dropdown
        items={paymentTypes}
        label={'Payment type'}
        onChange={setPaymentType}
        value={paymentType}
      />

      <ThemeButton
        onPress={() => {
          nextStep();
        }}
        label={'Submit Offer'}
      />

      {/*<View style={tw`p-3 bg-gray-100 rounded-md`}>*/}
      {/*  <ThemeText style={tw`font-semibold mb-2`}>*/}
      {/*    The offer is successfully submitted*/}
      {/*  </ThemeText>*/}
      {/*  <ThemeText>*/}
      {/*    The own received your purchase offer you willl receive notiftication*/}
      {/*    if wa accepted to continue with nogatiation stage of your offer.*/}
      {/*  </ThemeText>*/}
      {/*</View>*/}
    </View>
  );
}
