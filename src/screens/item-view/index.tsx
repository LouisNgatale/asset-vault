import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, View } from 'react-native';
import tw from '../../lib/tailwind.ts';
import Carousel from 'react-native-reanimated-carousel';
import ThemeText from '../../components/theme-text.tsx';
import Entypo from 'react-native-vector-icons/Entypo';
import ThemeButton from '../../components/theme-button.tsx';
import screens from '../../constants/screens.ts';

export default function ItemView({ navigation }: any) {
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
          <ThemeText style={tw`mb-2`}>Land</ThemeText>

          <View style={tw`flex flex-row gap-3 items-center mb-3`}>
            <Entypo name="location" size={20} />
            <ThemeText style={tw`font-bold`}>Location</ThemeText>
          </View>

          <ThemeText style={tw`mb-2`} type="subtext">
            Maelezo
          </ThemeText>

          <ThemeButton
            onPress={handleListAssetForSale}
            label="List to Market"
          />

          {/* View */}
          <View style={tw`w-full h-70 bg-gray-200 mt-4 mb-4`} />

          <ThemeText>Near by</ThemeText>

          <ThemeText type="subtext">
            Place near by the areas in this location
          </ThemeText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
