import { TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import tw from '../lib/tailwind.ts';
import { colors } from '../constants/colors.ts';
import ThemeText from './theme-text.tsx';

type Props = {
  label?: string;
  style?: ViewStyle;
  type?: 'default' | 'outlined' | 'outlined-round';
  labelStyle?: TextStyle;
  icon?: any;
  onPress: () => any;
};

export default function ThemeButton({
  label,
  style,
  type = 'default',
  labelStyle,
  icon,
  onPress,
}: Props) {
  let defaultStyle = tw`w-full text-center flex flex-row items-center justify-center px-6 min-h-[45px] rounded-sm`;

  if (type === 'outlined') {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[defaultStyle, tw`border border-primary-100`, style]}>
        {icon}
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
          {label}
        </ThemeText>
      )}
    </TouchableOpacity>
  );
}
