import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import tw from '../../lib/tailwind.ts';
import ThemeText from '../../components/theme-text.tsx';
import ThemeButton from '../../components/theme-button.tsx';
import ThemeInput from '../../components/input';
import screens from '../../constants/screens.ts';

type Props = {
  navigation: any;
};
export default function LoginScreen({ navigation }: PropsWithChildren<Props>) {
  return (
    <View style={tw`flex flex-1 items-center justify-center p-4`}>
      <ThemeText style={tw`mb-2 text-xl font-semibold`}>
        Login to Ardhi Yangu
      </ThemeText>
      <ThemeText type="subtext" style={tw`text-center mb-8`}>
        Ardhi Yangu will need to verify your account. Carrier charges may apply.
      </ThemeText>

      {/* Phone Number */}
      <ThemeInput
        name={'phoneNumber'}
        rules={{}}
        leftIcon={
          <>
            <ThemeText type="label" style={tw`p-0 m-0`}>
              +255
            </ThemeText>
          </>
        }
        placeholder={'Enter your phone number'}
        errors={[]}
        containerStyle={tw`py-[5px]`}
        label="Phone number:"
        keyboardType="numeric"
        maxLength={9}
      />

      {/* NIDA */}
      <ThemeInput
        name={'nidaNumber'}
        rules={{}}
        placeholder={'Enter your NIDA'}
        errors={[]}
        label="NIDA:"
        keyboardType="numeric"
        maxLength={20}
      />

      <ThemeButton
        onPress={() => {
          navigation.navigate(screens.RegistrationScreen);
        }}
        label={'Done'}
      />
    </View>
  );
}
