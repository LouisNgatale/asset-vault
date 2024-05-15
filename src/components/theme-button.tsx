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
  type?: 'default' | 'outlined' | 'outlined-round';
  labelStyle?: TextStyle;
  icon?: any;
  loading?: boolean;
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
}: Props) {
  let defaultStyle = tw`w-full text-center flex flex-row items-center justify-center px-6 min-h-[45px] rounded-sm`;

  if (type === 'outlined') {
    return (
      <TouchableOpacity
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
