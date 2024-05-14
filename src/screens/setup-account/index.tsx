import tw from '../../lib/tailwind.ts';
import { View } from 'react-native';
import ThemeText from '../../components/theme-text.tsx';
import ThemeInput from '../../components/input';
import ThemeButton from '../../components/theme-button.tsx';
import screens from '../../constants/screens.ts';
import React from 'react';

const formFieldNames = {
  fullName: 'fullName',
  occupation: 'occupation',
  emailAddress: 'emailAddress',
};

export default function RegisterScreen({ navigation }: { navigation: any }) {
  return (
    <View style={tw`flex flex-1 items-center justify-center p-4`}>
      <ThemeText style={tw`mb-2 text-xl font-semibold`}>
        Finish setting up your account
      </ThemeText>
      <ThemeText type="subtext" style={tw`text-center mb-8`}>
        Few easy steps for creating your ardhi yangu personal account , fill the
        form with valid data and your good to go.
      </ThemeText>

      {/* Full name */}
      <ThemeInput
        name={formFieldNames.fullName}
        rules={{}}
        placeholder={'Enter your full name'}
        errors={[]}
        label="Full name:"
        maxLength={9}
      />

      {/* Email */}
      <ThemeInput
        name={formFieldNames.emailAddress}
        rules={{}}
        placeholder={'Email'}
        errors={[]}
        label="Email:"
        maxLength={20}
      />

      {/* Occupation */}
      <ThemeInput
        name={formFieldNames.occupation}
        rules={{}}
        placeholder={'Occupation'}
        errors={[]}
        label="Occupation:"
        maxLength={20}
      />

      <ThemeButton
        onPress={() => {
          navigation.navigate(screens.Home);
        }}
        label={'Done'}
      />
    </View>
  );
}
