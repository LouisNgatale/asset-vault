import ThemeText from '../../components/theme-text.tsx';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ThemeButton from '../../components/theme-button.tsx';
import tw from '../../lib/tailwind.ts';
import { Alert, View } from 'react-native';
import ThemeCurrencyInput from '../../components/input/currency-input.tsx';
import { Asset } from '../../types/asset.ts';
import { useAppDispatch } from '../../lib/hooks/useRedux.ts';
import { fetchAssets, listAssetToMarket } from '../../state/asset/actions.ts';

export default function ListItemToMarket({
  assetId,
  asset,
}: {
  assetId: string;
  asset: Asset;
}) {
  const { control, handleSubmit } = useForm({});
  const [loading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const payload = {
        assetUUID: assetId,
        listingPrice: values.listingPrice.toString(),
      };

      await dispatch(listAssetToMarket(payload)).unwrap();

      dispatch(fetchAssets());
      return Alert.alert(
        'Item listed',
        "Your asset has been successfully listed on market. It'll be available for order submission by potential buyers",
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
        You're about to list your asset to the market. Please enter the listing
        price that will be considered as the starting price for the asset for
        buyers
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
        label={'List Item'}
      />
    </View>
  );
}
