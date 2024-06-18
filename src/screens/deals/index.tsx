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

export default function Deals({ navigation }: { navigation: any }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleNavigateToActiveDeal = (deal: Deal) => () => {
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
      <ScrollView
        contentContainerStyle={tw`p-3 h-full`}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchUserDeals} />
        }>
        {deals?.map((deal) => (
          <TouchableOpacity
            onPress={handleNavigateToActiveDeal(deal)}
            style={tw`w-full rounded-md bg-white mb-3 p-3 flex flex-row gap-3`}>
            <View style={tw`h-[80px] w-[80px] bg-gray-200`}>
              <Image
                source={{
                  uri: 'https://plus.unsplash.com/premium_photo-1684348962187-988fc3d7f024?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                }}
                style={{
                  height: 80,
                  justifyContent: 'center',
                  borderRadius: 6,
                  marginBottom: 6,
                }}
              />
            </View>
            <View>
              <ThemeText>Deal card</ThemeText>
              <ThemeText type="subtext">
                {deal.asset.location.locationName}
              </ThemeText>
              <ThemeText type="subtext">{toTSH(deal.proposedPrice)}</ThemeText>
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
