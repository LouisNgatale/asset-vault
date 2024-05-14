import { Input } from '@rneui/themed';
import React, { MutableRefObject, ReactElement } from 'react';
import tw from '../../lib/tailwind.ts';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import ThemeText from '../theme-text.tsx';

type InputProps = {
  placeholder?: string;
  placeholderTextColor?: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  errorStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
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
  refCallback?: MutableRefObject<null>;
  next?: MutableRefObject<null>;
  returnKeyType?: 'done' | 'next';
  value?: string;
  maxLength?: number;
  errorMessage?: string;
  disabled?: boolean;
  name: string;
  defaultValue?: string | undefined;
  rules: any;
  // control: Control<Record<string, any>>;
  errors: any;
  label?: string;
};

const handleSubmitEditing = (ref: any) => {
  if (!ref) {
    return () => undefined;
  }
  return () => ref.current && ref.current.focus();
};

export default function ThemeInput({
  label,
  onChangeText,
  placeholderTextColor,
  placeholder,
  leftIcon,
  rightIcon,
  value,
  disabled,
  autoCapitalize,
  secureTextEntry,
  maxLength,
  keyboardType,
  inputContainerStyle,
  refCallback,
  returnKeyType,
  style,
  errorMessage,
  onSubmitEditing,
  containerStyle,
  multiline,
  next,
  inputStyle,
}: InputProps) {
  // const input = React.createRef();
  const onHandleSubmitEditing = onSubmitEditing || handleSubmitEditing(next);

  const errorText = '';

  return (
    <View style={tw`mb-4 w-full`}>
      {label && (
        <ThemeText type="label" style={tw`mb-1`}>
          {label}
        </ThemeText>
      )}
      <Input
        // onBlur={onBlur}
        onChangeText={(text) => {
          // onChange(text);
          if (onChangeText) {
            onChangeText(text);
          }
        }}
        multiline={multiline}
        value={value}
        placeholder={placeholder}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        leftIconContainerStyle={tw`m-0`}
        errorStyle={[tw`hidden`]}
        inputContainerStyle={[
          tw` rounded-[6px] border-b-0`,
          inputContainerStyle,
        ]}
        inputStyle={[
          tw`text-black text-[14px] min-h-[24px] px-[7px] w-full mb-0 py-0`,
          inputStyle,
        ]}
        containerStyle={[
          tw`px-2 py-3 mb-0 border-[1.4px] border-primary-100 bg-white rounded-md`,
          containerStyle,
        ]}
        style={style}
        errorMessage={errorText || errorMessage}
        ref={refCallback}
        returnKeyType={returnKeyType}
        onSubmitEditing={onHandleSubmitEditing}
        disabled={disabled}
        autoCorrect={false}
        spellCheck={false}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={placeholderTextColor}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
      {errorMessage && (
        <ThemeText type="error" style={tw`mt-1`}>
          {errorMessage}
        </ThemeText>
      )}
    </View>
  );
}
