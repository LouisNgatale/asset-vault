import React, { MutableRefObject, ReactElement } from 'react';
import tw from '../../lib/tailwind.ts';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import ThemeText from '../theme-text.tsx';
import { Control, Controller } from 'react-hook-form';
import CurrencyInput from 'react-native-currency-input';
import { colors } from '../../constants/colors.ts';

type InputProps = {
  placeholder?: string;
  placeholderTextColor?: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  errorStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  multiline?: boolean;
  // shake?: boolean;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'name-phone-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password'
    | 'phone-pad';
  testID?: string;
  onSubmitEditing?: () => void;
  onChangeText?: (args?: any) => void;
  handleOnFocus?: (args?: any) => void;
  refCallback?: MutableRefObject<null>;
  next?: MutableRefObject<null>;
  returnKeyType?: 'done' | 'next';
  value?: string;
  maxLength?: number;
  errorMessage?: string;
  disabled?: boolean;
  name: string;
  defaultValue?: string | undefined;
  rules?: any;
  control: Control<any>;
  errors: any;
  label?: string;
  prefix?: string;
  suffix?: string;
};

export default function ThemeCurrencyInput({
  defaultValue,
  style,
  control,
  name,
  rules,
  value: customValue,
  prefix = 'Tsh ',
  label,
  suffix,
  handleOnFocus,
  ...TextInputProps
}: InputProps) {
  return (
    <View style={[tw`mb-3`, style]}>
      <View
        style={[
          tw`px-2 mb-0 border-[1.4px] border-primary-100 rounded-md justify-center h-[55px]`,
        ]}>
        <ThemeText type="subtext">{label}</ThemeText>
        <Controller
          control={control}
          name={name || ''}
          rules={rules}
          defaultValue={defaultValue}
          render={({ field: { onChange, onBlur, value } }) => (
            <CurrencyInput
              value={customValue || value}
              onChangeValue={onChange}
              onBlur={onBlur}
              prefix={prefix}
              placeholderTextColor={colors.darkGray}
              onFocus={handleOnFocus}
              suffix={suffix}
              delimiter=","
              separator="."
              precision={2}
              minValue={0}
              {...TextInputProps}
            />
          )}
        />
      </View>
    </View>
  );
}
