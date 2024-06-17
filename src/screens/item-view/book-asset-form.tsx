import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks/useRedux.ts';
import { bookAsset, fetchAssets } from '../../state/asset/actions.ts';
import { Alert, View } from 'react-native';
import tw from '../../lib/tailwind.ts';
import ThemeText from '../../components/theme-text.tsx';
import ThemeCurrencyInput from '../../components/input/currency-input.tsx';
import ThemeButton from '../../components/theme-button.tsx';
import { Asset } from '../../types/asset.ts';

export default function BookAssetForm({
  assetId,
  asset,
}: {
  assetId: string;
  asset: Asset;
}) {
  const { control, handleSubmit } = useForm({});
  const [loading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const user = useAppSelector(({ user: { user } }) => user);

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const payload = {
        assetUUID: assetId,
        proposedPrice: values.listingPrice.toString(),
        buyer: {
          uuid: user.uuid,
          fullName: user.fullName,
          NIDA: user.NIDA,
          phoneNumber: user.phoneNumber,
        },
      };

      await dispatch(bookAsset(payload)).unwrap();

      dispatch(fetchAssets());
      return Alert.alert(
        'Booking submitted',
        "Your booking has been submitted to the asset owner. You'll be notified for further procedures",
      );
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={tw`my-3`}>
      <ThemeText style={tw`my-4`}>
        You're about to initiate a transfer deal. Please enter the proposed
        buying price to initiate the deal
      </ThemeText>

      <ThemeCurrencyInput
        name={'listingPrice'}
        rules={{}}
        placeholder={'Enter your price'}
        errors={[]}
        label="Listing price:"
        defaultValue={asset.valuation || '0'}
        control={control}
        keyboardType="numeric"
        maxLength={20}
        returnKeyType="done"
      />

      <ThemeButton
        loading={loading}
        onPress={handleSubmit(onSubmit)}
        label={'Initiate Deal'}
      />
    </View>
  );
}
