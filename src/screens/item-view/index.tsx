import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from '../../lib/tailwind.ts';
import Carousel from 'react-native-reanimated-carousel';
import ThemeText from '../../components/theme-text.tsx';
import Entypo from 'react-native-vector-icons/Entypo';
import ThemeButton from '../../components/theme-button.tsx';
import { UserType } from '../../constants';
import SimilarItemCard from '../../components/similar-items-card.tsx';
import Feather from 'react-native-vector-icons/Feather';
import MapView, { Marker } from 'react-native-maps';
import { Asset } from '../../types/asset.ts';
import BottomSheet from '../../components/bottom-sheet';
import ListItemToMarket from './list-item-form.tsx';
import { useAppDispatch } from '../../lib/hooks/useRedux.ts';
import {
  deListAssetFromMarket,
  fetchAssets,
} from '../../state/asset/actions.ts';
import { toTSH } from '../../utils/currency.ts';
import BookAssetForm from './book-asset-form.tsx';

export enum ViewType {
  MARKET_PLACE = 'MARKET_PLACE',
  OWNER_ASSET = 'OWNER_ASSET',
}

export default function ItemView({ route }: { route: any }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userType = route.params.userType as UserType;
  const viewType = route.params.viewType as ViewType;
  const asset = route.params.asset as Asset;
  const dispatch = useAppDispatch();
  const [form, setForm] = useState('');

  const width = Dimensions.get('window').width;

  const handleListAssetForSale = () => {
    setForm('LIST_ASSET');
    setIsModalVisible(true);
  };

  const handleBookAsset = async () => {
    setForm('BOOK_ASSET');
    setIsModalVisible(true);
  };

  const handleDeLIstAssetFromMarket = async () => {
    try {
      await dispatch(
        deListAssetFromMarket({
          assetUUID: asset.uuid,
        }),
      ).unwrap();
      Alert.alert('Success', 'Your asset has been de-listed from the market');
      dispatch(fetchAssets());
    } catch (e) {
      console.error(e);
      Alert.alert(
        'Failure',
        'Failed to de-list asset from market, please try again later.',
      );
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView>
        <Carousel
          loop
          width={width}
          height={300}
          style={tw`mb-2`}
          data={asset.images}
          autoPlay={true}
          autoPlayInterval={4000}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <Image
              source={{
                uri: item,
              }}
              style={{
                height: 300,
                justifyContent: 'center',
              }}
            />
          )}
        />
        <View style={tw`p-4`}>
          <ThemeText style={tw`mb-2`} type="subtext">
            {asset?.type}
          </ThemeText>

          <View style={tw`flex flex-row gap-3 items-center mb-3`}>
            <Entypo name="location" size={20} />
            <ThemeText style={tw`font-bold`}>
              {asset.location.locationName}
            </ThemeText>
          </View>

          {viewType === ViewType.MARKET_PLACE && (
            <ThemeText style={tw`font-semibold`}>
              Price: {toTSH(asset.listingPrice || asset.valuation || '0')}
            </ThemeText>
          )}

          {viewType === ViewType.OWNER_ASSET && (
            <ThemeText style={tw`font-semibold`}>
              Price: {toTSH(asset.valuation || '0')}
            </ThemeText>
          )}

          <ThemeText style={tw`font-semibold text-sm`} type="subtext">
            Parcel No: {asset.parcelNumber}
          </ThemeText>

          <ThemeText style={tw`mb-2 font-semibold text-sm`} type="subtext">
            Plot No: {asset.plotNumber}
          </ThemeText>

          <ThemeText style={tw`mb-2`}>Description</ThemeText>
          <ThemeText style={tw`mb-4 text-justify`} type="subtext">
            {asset.description}
          </ThemeText>

          {userType === UserType.BUYER && (
            <>
              <ThemeButton onPress={handleBookAsset} label={'Book Now'} />
            </>
          )}

          {userType === UserType.OWNER && !asset.isListed && (
            <>
              <ThemeButton
                onPress={handleListAssetForSale}
                label={'List to Market'}
              />
            </>
          )}

          {userType === UserType.OWNER && asset.isListed && (
            <>
              <ThemeButton
                onPress={handleDeLIstAssetFromMarket}
                label={'De-List from Market'}
              />
            </>
          )}

          {/* View */}
          <View style={tw`w-full h-70 bg-gray-200 mt-4 mb-4`}>
            <MapView
              style={tw`flex-1`}
              initialRegion={{
                latitude: asset.location.latitude,
                longitude: asset.location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Marker
                coordinate={{
                  latitude: asset.location.latitude,
                  longitude: asset.location.longitude,
                }}
              />
            </MapView>
          </View>

          <ThemeText>Near by</ThemeText>

          <ThemeText type="subtext">{asset.location.nearbyLocation}</ThemeText>

          {userType === UserType.BUYER && (
            <View style={tw`mt-4`}>
              {/* Owner Details */}
              <View style={tw`flex flex-row gap-3 items-center mb-6`}>
                <View style={tw`h-15 w-15 rounded-full bg-white`} />
                <View>
                  <ThemeText type="subtext">Owner</ThemeText>
                  <ThemeText style={tw`text-sm`}>
                    {asset.owner.fullName}
                  </ThemeText>

                  <View style={tw`flex flex-row gap-4 mt-2`}>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(`tel:0${asset.owner.phoneNumber}`)
                      }
                      style={tw`px-4 py-1 bg-white rounded-md flex flex-row gap-2 items-center`}>
                      <Feather name={'phone'} size={14} />
                      <ThemeText>Call</ThemeText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={tw`px-4 py-1 bg-white rounded-md flex flex-row gap-2 items-center`}>
                      <Feather name={'message-circle'} size={14} />
                      <ThemeText>Message</ThemeText>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Similar Deals */}
              <FlatList
                style={tw`mb-3`}
                data={[...new Array(4).keys()]}
                renderItem={SimilarItemCard}
                horizontal={true}
              />
            </View>
          )}
        </View>
      </ScrollView>

      <BottomSheet
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}>
        {form === 'LIST_ASSET' && (
          <ListItemToMarket assetId={asset.uuid} asset={asset} />
        )}
        {form === 'BOOK_ASSET' && (
          <BookAssetForm assetId={asset.uuid} asset={asset} />
        )}
      </BottomSheet>
    </SafeAreaView>
  );
}
