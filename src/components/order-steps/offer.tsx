import React, { useState } from 'react';
import { View } from 'react-native';
import ThemeText from '../theme-text.tsx';
import tw from '../../lib/tailwind.ts';
import { useForm } from 'react-hook-form';
import { LoginDto } from '../../state/user/types.ts';
import { PaymentType } from '../../constants';
import ThemeButton from '../theme-button.tsx';
import { BookingStage, Deal } from '../../types/asset.ts';
import { toTSH } from '../../utils/currency.ts';
import { useAppDispatch, useAppSelector } from '../../lib/hooks/useRedux.ts';
import { updateDeal } from '../../state/asset/actions.ts';
import { DealStage } from '../../constants/asset.ts';
import { useNavigation } from '@react-navigation/native';
import { isNil } from 'lodash';

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
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { control } = useForm<LoginDto>({
    defaultValues: {
      phoneNumber: 0,
      NIDA: 0,
    },
  });
  const [paymentType, setPaymentType] = useState();
  const cancelled = deal.stages.find((stg) => stg.name === DealStage.CANCELLED);

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

  const handleInitiateNegotiations = async () => {
    setLoading(true);
    try {
      const payload: BookingStage = {
        name: DealStage.NEGOTIATION,
        date: new Date(),
        metadata: {
          status: [
            {
              type: 'STARTED',
              time: new Date(),
            },
          ],
        },
      };

      await dispatch(
        updateDeal({
          stage: payload,
          dealUUID: deal.uuid,
        }),
      ).unwrap();
      nextStep();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(true);
    }
  };

  const handleEndNegotiation = async () => {
    setLoading(true);
    try {
      const payload: BookingStage = {
        name: DealStage.CANCELLED,
        date: new Date(),
        metadata: {
          status: [
            {
              type: 'CANCELLED',
              time: new Date(),
            },
          ],
        },
      };

      await dispatch(
        updateDeal({
          stage: payload,
          dealUUID: deal.uuid,
        }),
      ).unwrap();
      navigation.goBack();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(true);
    }
  };

  return (
    <View>
      {deal.asset.owner.uuid !== user.uuid && isNil(cancelled) && (
        <ThemeText style={tw`text-center font-semibold mb-3`}>
          Your offer proposal has been submitted to the asset owner. You'll
          proceed with next steps once they confirm.
        </ThemeText>
      )}

      {deal.asset.owner.uuid === user.uuid && isNil(cancelled) && (
        <>
          <ThemeText style={tw`mb-3`}>
            The buyer has proposed an offer starting with{' '}
            {toTSH(deal.proposedPrice)}. The buyer offers to pay in{' '}
            {deal.stages[0].metadata.paymentType} format. You can proceed with
            negotiations and offer your counter offer
          </ThemeText>

          {/*<Dropdown*/}
          {/*  items={paymentTypes}*/}
          {/*  label={'Payment type'}*/}
          {/*  onChange={setPaymentType}*/}
          {/*  value={paymentType}*/}
          {/*/>*/}

          <View style={tw`mb-2`}>
            <ThemeButton
              loading={loading}
              onPress={handleInitiateNegotiations}
              label={'Initiate negotiations'}
            />
          </View>

          <ThemeButton
            loading={loading}
            onPress={handleEndNegotiation}
            type="clear"
            label={'End negotiation'}
          />
        </>
      )}

      {cancelled && (
        <ThemeText>
          Sorry, this purchase request has been cancelled by the owner. Please
          proceed to re-submitting a new counter offer if you wish to proceed
          with the purchase.
        </ThemeText>
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
