import RNPickerSelect from 'react-native-picker-select';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from '../../lib/tailwind.ts';
import { View, ViewStyle } from 'react-native';
import ThemeText from '../theme-text.tsx';
import { isFunction } from 'lodash';
import { colors } from '../../constants/colors.ts';

export type DropdownItems = {
  label: string;
  value: string | null;
};

type Props = {
  placeholder?: DropdownItems;
  items: DropdownItems[];
  label: string;
  style?: ViewStyle;
  value?: any;
  useNativeAndroidPickerStyle?: boolean;
  onChange?: any;
  error?: string;
  pickerRef?: React.RefObject<RNPickerSelect>;
};

const DropdownComponent = ({
  items,
  placeholder = {
    label: 'Select Items',
    value: 'Select Items',
  },
  label,
  style,
  value: customValue,
  useNativeAndroidPickerStyle,
  onChange,
  pickerRef,
  error,
}: Props) => {
  const [value, setValue] = useState(null);

  const SortIcon = () => <Icon name="sort" size={14} color={colors.orange} />;

  return (
    <View style={[tw`mb-4`, style]}>
      <View style={[tw`border-[1px] border-primary-100 rounded-md p-2`]}>
        <ThemeText type="label" style={tw`font-semibold text-[11px] mb-0`}>
          {label}
        </ThemeText>
        <RNPickerSelect
          ref={pickerRef}
          placeholder={placeholder}
          onValueChange={(value) => {
            return isFunction(onChange) ? onChange(value) : setValue(value);
          }}
          Icon={SortIcon}
          value={value || customValue}
          items={items}
          style={{
            inputIOS: tw`text-[14px]`,
            inputAndroid: tw`text-[12px] h-[40px] pr-[30px] text-black py-0 m-0`,
            iconContainer: {
              right: 12,
            },
            modalViewTop: {
              margin: 10,
            },
          }}
          useNativeAndroidPickerStyle={useNativeAndroidPickerStyle}
          pickerProps={{ itemStyle: { fontSize: 15, color: colors.orange } }}
        />
      </View>
      {error && <ThemeText type="error">{error}</ThemeText>}
    </View>
  );
};

export default DropdownComponent;
