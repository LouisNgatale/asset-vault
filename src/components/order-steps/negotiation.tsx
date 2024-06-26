import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { Dimensions, View } from 'react-native';
import tw from '../../lib/tailwind.ts';
import ThemeButton from '../theme-button.tsx';
import { BookingStage, Deal } from '../../types/asset.ts';
import { useAppDispatch, useAppSelector } from '../../lib/hooks/useRedux.ts';
import { sendMessage, updateDeal } from '../../state/asset/actions.ts';
import { DealStage } from '../../constants/asset.ts';
import { useNavigation } from '@react-navigation/native';

export default function Negotiation({
  nextStep,
  deal,
}: {
  nextStep: () => void;
  previousStep: () => void;
  deal: Deal;
}) {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const mapMessage = (message: any) => ({
    _id: message.id,
    text: message.text,
    createdAt: message.createdAt,
    user: {
      _id: message.user.uuid,
      name: message.user.fullName,
      avatar: 'https://placeimg.com/140/140/any',
    },
  });

  const user = useAppSelector(({ user: { user } }) => user);

  useEffect(() => {
    setMessages(deal.messages.map(mapMessage));
  }, []);

  const handleSendMessages = async (messages: IMessage[]) => {
    try {
      const payload = messages.map((msg) => ({
        id: msg._id,
        text: msg.text,
        createdAt: msg.createdAt,
        user: {
          uuid: msg.user._id,
          fullName: msg.user.name,
          avatar: msg.user.avatar,
        },
      }));

      dispatch(
        sendMessage({
          messages: payload,
          dealUUID: deal.uuid,
        }),
      );
    } catch (e) {
      console.error(e);
    }
  };

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
    handleSendMessages(messages);
  }, []);

  const height = Dimensions.get('screen').height;

  const handleCompleteNegotiations = async () => {
    setLoading(true);
    try {
      const payload: BookingStage = {
        name: DealStage.CONTRACT_DRAFTING,
        date: new Date(),
        metadata: {
          status: 'COMPLETED',
        },
      };

      await dispatch(
        updateDeal({
          stage: payload,
          dealUUID: deal.uuid,
        }),
      ).unwrap();

      nextStep();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleEndDeal = async () => {
    setLoading(true);
    try {
      const payload: BookingStage = {
        name: DealStage.CANCELLED,
        date: new Date(),
        metadata: {
          status: 'CANCELLED',
        },
      };

      await dispatch(
        updateDeal({
          stage: payload,
          dealUUID: deal.uuid,
        }),
      ).unwrap();

      navigation.goBack();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[
        tw`w-full min-h-full`,
        {
          height: height / 1.35,
        },
      ]}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user.uuid,
          name: user.fullName,
          avatar: 'https://placeimg.com/140/140/any',
        }}
      />

      {/* TODO: Uncomment */}
      {/*{deal.asset.owner.uuid === user.uuid && (*/}
      <View style={tw`mb-2`}>
        <ThemeButton
          loading={loading}
          label="Proceed next step"
          onPress={handleCompleteNegotiations}
        />
      </View>
      <ThemeButton
        loading={loading}
        label="End Negotiations"
        onPress={handleEndDeal}
        type="clear"
      />
      {/*)}*/}
    </View>
  );
}
