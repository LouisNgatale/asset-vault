import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import ThemeText from '../theme-text.tsx';
import tw from '../../lib/tailwind.ts';
import { Deal } from '../../types/asset.ts';
import { useForm } from 'react-hook-form';
import ThemeCurrencyInput from '../input/currency-input.tsx';
import { useAppDispatch, useAppSelector } from '../../lib/hooks/useRedux.ts';
import ThemeButton from '../theme-button.tsx';
import currency from 'currency.js';
import { toTSH } from '../../utils/currency.ts';
import { confirmPayment, transferAsset } from '../../state/asset/actions.ts';

export default function TitleIssuance({
  deal,
}: {
  nextStep: () => void;
  previousStep: () => void;
  deal: Deal;
}) {
  const { control, handleSubmit } = useForm<{}>({
    defaultValues: {
      phoneNumber: 0,
      NIDA: 0,
    },
  });
  const [loading, setLoading] = useState(false);
  const user = useAppSelector(({ user: { user } }) => user);
  const dispatch = useAppDispatch();

  const handleTransferAsset = async () => {
    try {
      await dispatch(transferAsset(deal.uuid)).unwrap();

      return Alert.alert(
        'Asset transfered successfully',
        'The asset has been completely transfered to the new owner! The deal will now proceed to closing',
      );
    } catch (e) {
      console.error(e);
    }
  };

  const savePaidAmount = async (values: any) => {
    setLoading(true);
    try {
      await dispatch(
        confirmPayment({
          dealUUID: deal.uuid,
          paidAmount: values.paidAmount,
        }),
      ).unwrap();

      return Alert.alert(
        'Payment recorded',
        'Your payment has been successfully recorded.',
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <ThemeText>
        Once all the payments are done, you will be issued with the title deed.
      </ThemeText>

      <View style={tw`flex flex-row gap-2 mt-3`}>
        <ThemeText>Paid Amount:</ThemeText>
        <ThemeText style={tw`font-semibold`}>
          {toTSH(deal.paidAmount)}
        </ThemeText>
      </View>

      <View style={tw`flex flex-row gap-2 mb-3`}>
        <ThemeText>Pending Amount:</ThemeText>
        <ThemeText style={tw`font-semibold`}>
          {toTSH(currency(deal.proposedPrice).subtract(deal.paidAmount || 0))}
        </ThemeText>
      </View>

      {/* Enter amount to be paid */}
      {deal.asset.owner.uuid === user.uuid &&
        currency(deal.proposedPrice).subtract(deal.paidAmount || 0).value >
          0 && (
          <View style={tw`mb-3`}>
            <ThemeCurrencyInput
              name={'paidAmount'}
              rules={{}}
              placeholder={'Confirm paid amount'}
              errors={[]}
              defaultValue={currency(deal.proposedPrice)
                .subtract(deal.paidAmount || 0)
                .toString()}
              label="Paid amount"
              control={control}
              keyboardType="numeric"
              maxLength={20}
              returnKeyType="done"
            />

            <ThemeButton
              loading={loading}
              label="Confirm paid amount"
              onPress={handleSubmit(savePaidAmount)}
              type="clear"
            />
          </View>
        )}

      {currency(deal.proposedPrice).subtract(deal.paidAmount || 0).value ===
        0 &&
        deal.asset.owner.uuid === user.uuid && (
          <ThemeButton
            loading={loading}
            label="Finish transfering asset"
            onPress={handleTransferAsset}
            disabled={
              currency(deal.proposedPrice).subtract(deal.paidAmount || 0)
                .value > 0
            }
          />
        )}

      {/* TODO: Upload image as proof */}
      {/* TODO: Asset transfer stage */}
      {/* TODO: Title deed issuance */}
    </View>
  );
}
