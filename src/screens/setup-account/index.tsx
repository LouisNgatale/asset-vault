import tw from '../../lib/tailwind.ts';
import { Alert } from 'react-native';
import ThemeText from '../../components/theme-text.tsx';
import ThemeInput from '../../components/input';
import ThemeButton from '../../components/theme-button.tsx';
import screens from '../../constants/screens.ts';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm } from 'react-hook-form';
import { AppResponseError, RegistrationDto } from '../../state/user/types.ts';
import { register } from '../../state/user/actions.ts';
import { ResponseCode } from '../../constants/request.ts';
import { useAppDispatch } from '../../lib/hooks/useRedux.ts';

const formFieldNames = {
  fullName: 'fullName',
  emailAddress: 'email',
  NIDA: 'NIDA',
  phoneNumber: 'phoneNumber',
};

export default function RegisterScreen({ navigation }: { navigation: any }) {
  const dispatch = useAppDispatch();

  const { control, handleSubmit } = useForm<RegistrationDto>({
    defaultValues: {
      phoneNumber: '',
      NIDA: '',
      fullName: '',
      email: '',
    },
  });

  const onSubmit = async (values: RegistrationDto) => {
    try {
      const payload: RegistrationDto = {
        NIDA: values.NIDA,
        phoneNumber: values.phoneNumber,
        fullName: values.fullName,
        email: values.email,
      };
      console.log({ payload });

      const response = await dispatch(register(payload)).unwrap();
      console.log({ response });

      Alert.alert(
        'Account Created 🎉',
        'Your account was created successfully. Please proceed to logging in.',
      );
    } catch (e) {
      console.error(e);
      const error = e as AppResponseError;
      if (error.code === ResponseCode.USER_ALREADY_EXISTS) {
        Alert.alert(
          'Account already exists',
          'It seems like you the account already exists. Please proceed to logging in.',
        );

        return navigation.navigate(screens.RegistrationScreen);
      }

      return Alert.alert(
        'Generic error',
        "It seems like there's a generic error. Please contact support and try again later",
      );
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={tw`flex flex-1 items-center justify-center p-4 bg-white`}>
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
        control={control}
        label="Full name:"
        returnKeyType="next"
      />

      {/* Email */}
      <ThemeInput
        name={formFieldNames.emailAddress}
        rules={{}}
        placeholder={'Email'}
        errors={[]}
        label="Email:"
        control={control}
        returnKeyType="next"
      />

      {/* Phone Number */}
      <ThemeInput
        name={formFieldNames.phoneNumber}
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
        control={control}
        containerStyle={tw`py-[5px]`}
        label="Phone number:"
        keyboardType="numeric"
        maxLength={9}
        returnKeyType="next"
      />

      {/* NIDA */}
      <ThemeInput
        name={formFieldNames.NIDA}
        rules={{}}
        placeholder={'Enter your NIDA'}
        errors={[]}
        label="NIDA:"
        control={control}
        keyboardType="numeric"
        maxLength={20}
        returnKeyType="done"
      />

      <ThemeButton onPress={handleSubmit(onSubmit)} label={'Done'} />
      <ThemeButton
        onPress={() => navigation.navigate(screens.LoginScreen)}
        label={'Already have account? Login'}
        type="clear"
      />
    </KeyboardAwareScrollView>
  );
}
