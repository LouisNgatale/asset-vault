import React from 'react';
import {
  Dimensions,
  FlatList,
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
import screens from '../../constants/screens.ts';
import { UserType } from '../../constants';
import SimilarItemCard from '../../components/similar-items-card.tsx';
import Feather from 'react-native-vector-icons/Feather';

export default function ItemView({ navigation, route }: any) {
  const userType = route.params.userType as UserType;

  const width = Dimensions.get('window').width;

  const handleListAssetForSale = () => {
    navigation.navigate(screens.ListAsset);
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <ScrollView>
        <Carousel
          loop
          width={width}
          height={300}
          style={tw`mb-2 bg-gray-100`}
          data={[...new Array(6).keys()]}
          scrollAnimationDuration={1000}
          renderItem={({ index }) => (
            <View
              style={{
                height: 300,
                borderWidth: 1,
                justifyContent: 'center',
              }}>
              <ThemeText style={{ textAlign: 'center', fontSize: 30 }}>
                {index}
              </ThemeText>
            </View>
          )}
        />
        <View style={tw`p-4 bg-gray-100`}>
          <ThemeText style={tw`mb-2`} type="subtext">
            Asset Type
          </ThemeText>

          <View style={tw`flex flex-row gap-3 items-center mb-3`}>
            <Entypo name="location" size={20} />
            <ThemeText style={tw`font-bold`}>Location</ThemeText>
          </View>

          {userType === UserType.BUYER && (
            <ThemeText style={tw`mb-3 font-semibold`}>
              Price: Tzs 14,000,000/=
            </ThemeText>
          )}

          <ThemeText style={tw`mb-2`}>Description</ThemeText>
          <ThemeText style={tw`mb-4 text-justify`} type="subtext">
            Location: Suburban residential area with established homes and
            schools nearby. Size and Shape: Half-acre lot with a rectangular
            shape and mature trees. Zoning and Permits: Residential zoning,
            permits required for new construction. Terrain and Features: Level
            terrain, utility connections at the street, and no HOA restrictions.
            Potential Use: Ideal for building a custom single-family home with a
            backyard oasis. Access and Transportation: Paved road access, public
            utilities available, and commuter routes nearby.
          </ThemeText>

          <ThemeButton
            onPress={handleListAssetForSale}
            label={userType === UserType.BUYER ? 'Book Now' : 'List to Market'}
          />

          {/* View */}
          <View style={tw`w-full h-70 bg-gray-200 mt-4 mb-4`} />

          <ThemeText>Near by</ThemeText>

          <ThemeText type="subtext">
            Place near by the areas in this location
          </ThemeText>

          {userType === UserType.BUYER && (
            <View style={tw`mt-4`}>
              {/* Owner Details */}
              <View style={tw`flex flex-row gap-3 items-center mb-6`}>
                <View style={tw`h-15 w-15 rounded-full bg-white`} />
                <View>
                  <ThemeText type="subtext">Owner</ThemeText>
                  <ThemeText style={tw`text-sm`}>Owner Full Name</ThemeText>

                  <View style={tw`flex flex-row gap-4 mt-2`}>
                    <TouchableOpacity
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
    </SafeAreaView>
  );
}
