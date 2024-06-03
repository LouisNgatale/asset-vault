import React, { PropsWithChildren, useRef } from 'react';
import { Alert, View } from 'react-native';
import tw from '../../lib/tailwind.ts';
import ThemeText from '../../components/theme-text.tsx';
import ThemeButton from '../../components/theme-button.tsx';
import ThemeInput from '../../components/input';
import { LoginDto, ResponseError } from '../../state/user/types.ts';
import { useAppDispatch, useAppSelector } from '../../lib/hooks/useRedux.ts';
import { login } from '../../state/user/actions.ts';
import { useForm } from 'react-hook-form';
import { ResponseCode } from '../../constants/request.ts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import screens from '../../constants/screens.ts';

type Props = {
  navigation: any;
};

const formFieldValues = {
  NIDA: 'NIDA',
  phoneNumber: 'phoneNumber',
};

export default function LoginScreen({ navigation }: PropsWithChildren<Props>) {
  const dispatch = useAppDispatch();
  const nidaRef = useRef();

  const loading = useAppSelector(({ user: { loading } }) => loading);
  const { control, handleSubmit } = useForm<LoginDto>({
    defaultValues: {
      phoneNumber: 0,
      NIDA: 0,
    },
  });

  const onSubmit = async (values: LoginDto) => {
    try {
      console.log({ values });
      const payload: LoginDto = {
        NIDA: values.NIDA,
        phoneNumber: values.phoneNumber,
      };
      await dispatch(login(payload)).unwrap();
      // const body = response as LoginResponse;
    } catch (e) {
      console.error(e);
      const error = e as ResponseError;
      if (error.code === ResponseCode.USER_DOESNT_EXIST) {
        Alert.alert(
          'Account not found',
          "It seems like you don't have an account yet. Please proceed to creating one",
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
        Login to Ardhi Yangu
      </ThemeText>
      <ThemeText type="subtext" style={tw`text-center mb-8`}>
        Ardhi Yangu will need to verify your account. Carrier charges may apply.
      </ThemeText>

      {/* Phone Number */}
      <ThemeInput
        name={formFieldValues.phoneNumber}
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
        next={nidaRef.current}
        returnKeyType="next"
      />

      {/* NIDA */}
      <ThemeInput
        name={formFieldValues.NIDA}
        rules={{}}
        placeholder={'Enter your NIDA'}
        errors={[]}
        label="NIDA:"
        control={control}
        keyboardType="numeric"
        maxLength={20}
        returnKeyType="done"
      />

      <ThemeButton
        loading={loading}
        onPress={handleSubmit(onSubmit)}
        label={'Done'}
      />

      <ThemeButton
        onPress={() => navigation.navigate(screens.RegistrationScreen)}
        label={"Don't have account? Create one here!"}
        type="clear"
      />
    </KeyboardAwareScrollView>
  );
}
