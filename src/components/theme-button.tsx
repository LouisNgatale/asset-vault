import React from 'react';
import {
  ActivityIndicator,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import tw from '../lib/tailwind.ts';
import ThemeText from './theme-text.tsx';

type Props = {
  label?: string;
  style?: ViewStyle;
  type?: 'default' | 'outlined' | 'outlined-round' | 'clear';
  labelStyle?: TextStyle;
  icon?: any;
  loading?: boolean;
  disabled?: boolean;
  onPress: () => any;
};

export default function ThemeButton({
  label,
  style,
  type = 'default',
  labelStyle,
  icon,
  onPress,
  loading,
  disabled,
}: Props) {
  let defaultStyle = tw`w-full text-center flex flex-row items-center justify-center px-6 min-h-[45px] rounded-md`;

  if (type === 'clear') {
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[defaultStyle, style]}>
        {icon}
        {loading && (
          <ActivityIndicator size="small" color="#0000ff" style={tw`mr-3`} />
        )}

        <ThemeText style={labelStyle}>{label}</ThemeText>
      </TouchableOpacity>
    );
  }

  if (type === 'outlined') {
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[defaultStyle, tw`border border-primary-100`, style]}>
        {icon}
        {loading && (
          <ActivityIndicator size="small" color="#0000ff" style={tw`mr-3`} />
        )}

        <ThemeText style={labelStyle}>{label}</ThemeText>
      </TouchableOpacity>
    );
  }

  if (type === 'outlined-round') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
          defaultStyle,
          tw`border border-primary-100 rounded-full`,
          style,
        ]}>
        {loading && (
          <ActivityIndicator size="small" color="#0000ff" style={tw`mr-3`} />
        )}
        {icon}
        {label && <ThemeText style={labelStyle}>{label}</ThemeText>}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[defaultStyle, tw`bg-primary-100`]}>
      {icon}
      {label && (
        <ThemeText
          style={[
            tw`text-white text-center text-lg font-semibold`,
            labelStyle || {},
          ]}>
          {loading && (
            <ActivityIndicator size="small" color="#0000ff" style={tw`mr-3`} />
          )}

          {label}
        </ThemeText>
      )}
    </TouchableOpacity>
  );
}
