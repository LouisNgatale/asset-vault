import React, { useState } from 'react';
import { View } from 'react-native';
import ThemeText from '../theme-text.tsx';
import tw from '../../lib/tailwind.ts';
import { useForm } from 'react-hook-form';
import { LoginDto } from '../../state/user/types.ts';
import Dropdown from '../dropdown';
import { PaymentType } from '../../constants';
import ThemeButton from '../theme-button.tsx';
import { Deal } from '../../types/asset.ts';
import { toTSH } from '../../utils/currency.ts';
import { useAppSelector } from '../../lib/hooks/useRedux.ts';

const formFieldValues = {
  price: 'price',
};

export default function Offer({
  nextStep,
  deal,
}: {
  nextStep: () => void;
  previousStep: () => void;
  deal: Deal;
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

  const user = useAppSelector(({ user: { user } }) => user);

  return (
    <View>
      {deal.asset.owner.uuid !== user.uuid && (
        <ThemeText style={tw`text-center font-semibold mb-3`}>
          Your offer proposal has been submitted to the asset owner. You'll
          proceed with next steps once they confirm.
        </ThemeText>
      )}

      {deal.asset.owner.uuid === user.uuid && (
        <>
          <ThemeText style={tw`mb-3`}>
            The buyer has proposed an offer starting with{' '}
            {toTSH(deal.proposedPrice)}. You can proceed with negotiations and
            offer your counter offer
          </ThemeText>

          <Dropdown
            items={paymentTypes}
            label={'Payment type'}
            onChange={setPaymentType}
            value={paymentType}
          />

          <View style={tw`mb-2`}>
            <ThemeButton
              onPress={() => {
                nextStep();
              }}
              label={'Initiate negotiations'}
            />
          </View>

          <ThemeButton
            onPress={() => {
              nextStep();
            }}
            type="clear"
            label={'Cancel request'}
          />
        </>
      )}

      {/*<ThemeCurrencyInput*/}
      {/*  name={formFieldValues.price}*/}
      {/*  rules={{}}*/}
      {/*  placeholder={'Enter your proposed price'}*/}
      {/*  errors={[]}*/}
      {/*  defaultValue={deal.proposedPrice}*/}
      {/*  label="Proposed buying price"*/}
      {/*  control={control}*/}
      {/*  keyboardType="numeric"*/}
      {/*  maxLength={20}*/}
      {/*  returnKeyType="done"*/}
      {/*/>*/}

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
