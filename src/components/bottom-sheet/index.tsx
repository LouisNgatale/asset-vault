import React, { PropsWithChildren } from 'react';
import tw from '../../lib/tailwind.ts';
import Modal from 'react-native-modal';
import { TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../constants/colors.ts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Props = {
  isModalVisible: boolean;
  setIsModalVisible: any;
};

export default function BottomSheet({
  isModalVisible,
  children,
  setIsModalVisible,
}: PropsWithChildren<Props>) {
  const handleDismissModal = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal isVisible={isModalVisible} style={tw`m-0`}>
      {/* Header */}
      <View
        style={tw`w-[50px] h-[40px] pr-[10px] flex-1 m-0 mb-10 self-end`}></View>

      {/* Bottom */}
      <View
        style={tw`bg-white h-auto max-h-[82%] p-[20px] pt-[12px] rounded-tr-[20px] rounded-tl-[20px]`}>
        <View style={tw`mb-4 z-1`}>
          <TouchableOpacity
            onPress={handleDismissModal}
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              backgroundColor: colors.darkGray,
              borderRadius: 50,
              padding: 4,
            }}>
            <MaterialCommunityIcons
              name="window-close"
              size={16}
              // @ts-ignore
              color={colors.white}
              style={tw`text-right`}
            />
          </TouchableOpacity>
        </View>
        <KeyboardAwareScrollView>{children}</KeyboardAwareScrollView>
      </View>
    </Modal>
  );
}
