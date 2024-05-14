import { Text, TextStyle } from 'react-native';
import tw from '../lib/tailwind.ts';
import { PropsWithChildren } from 'react';

interface IProps {
  style?: TextStyle | TextStyle[];
  type?: 'default' | 'heading' | 'subtext' | 'error' | 'label';

  [key: string]: any;
}

export default function ThemeText({
  style,
  children,
  type = 'default',

  ...otherProps
}: PropsWithChildren<IProps>) {
  let styledText = tw`text-base`;

  if (type === 'heading') {
    styledText = tw`text-white text-lg font-bold`;
  }

  if (type === 'label') {
    styledText = tw`text-sm text-gray-300`;
  }

  if (type === 'subtext') {
    styledText = tw`text-sm text-gray-300`;
  }

  if (type === 'error') {
    styledText = tw`text-sm text-red-300`;
  }

  return (
    <Text style={[tw``, styledText, style]} {...otherProps}>
      {children}
    </Text>
  );
}
