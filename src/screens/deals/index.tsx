import React, { useEffect, useState } from 'react';
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import ThemeText from '../../components/theme-text.tsx';
import tw from '../../lib/tailwind.ts';
import screens from '../../constants/screens.ts';
import { useAppDispatch, useAppSelector } from '../../lib/hooks/useRedux.ts';
import { fetchDeals } from '../../state/asset/actions.ts';
import { Deal } from '../../types/asset.ts';
import { toTSH } from '../../utils/currency.ts';
import { isEmpty } from 'lodash';
import { setDeal } from '../../state/asset/reducer.ts';

export default function Deals({ navigation }: { navigation: any }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleNavigateToActiveDeal = (deal: Deal) => () => {
    dispatch(setDeal(deal));
    navigation.navigate(screens.ActiveDeal, {
      deal,
    });
  };

  useEffect(() => {
    fetchUserDeals();
  }, []);

  const fetchUserDeals = async () => {
    try {
      setLoading(true);
      await dispatch(fetchDeals()).unwrap();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const deals = useAppSelector(({ assets: { deals } }) => deals);

  return (
    <SafeAreaView>
      <ThemeText style={tw`text-lg font-semibold text-center`}>
        Active Deals
      </ThemeText>

      <ScrollView
        contentContainerStyle={tw`p-3 h-full`}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchUserDeals} />
        }>
        {deals?.map((deal) => (
          <TouchableOpacity
            onPress={handleNavigateToActiveDeal(deal)}
            style={tw`w-full rounded-md bg-white mb-3 p-3 flex flex-row gap-3 items-center`}>
            <View style={tw`h-[100px] w-[100px] bg-gray-200 rounded-[6px]`}>
              <Image
                source={{
                  uri: deal.asset.images[0],
                }}
                style={{
                  height: 100,
                  justifyContent: 'center',
                  borderRadius: 6,
                  marginBottom: 6,
                }}
              />
            </View>
            <View>
              <ThemeText>Buyer: {deal.buyer.fullName}</ThemeText>
              <ThemeText type="subtext">
                Location: {deal.asset.location.locationName}
              </ThemeText>
              <ThemeText type="subtext">
                Seller: {deal.asset.owner.fullName}
              </ThemeText>
              <ThemeText type="subtext">
                Original Price: {toTSH(deal.asset.valuation)}
              </ThemeText>
              <ThemeText type="subtext">
                Offer: {toTSH(deal.proposedPrice)}
              </ThemeText>
            </View>
          </TouchableOpacity>
        ))}

        {isEmpty(deals) && (
          <>
            <ThemeText>
              You currently don't have any active ongoing deals. Please proceed
              with browsing the marketplace to find suitable assets that you can
              initiate purchase deal for
            </ThemeText>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
