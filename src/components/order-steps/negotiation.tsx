import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { View } from 'react-native';
import tw from '../../lib/tailwind.ts';
import ThemeButton from '../theme-button.tsx';
import ThemeText from '../theme-text.tsx';
import DatePicker from 'react-native-date-picker';

export default function Negotiation({
  nextStep,
}: {
  nextStep: () => void;
  previousStep: () => void;
}) {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMessages([
      {
        _id: '1',
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: '2',
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <View style={tw`flex-1 h-full`}>
      <ThemeButton label="Close Negotiations" onPress={() => nextStep()} />

      <ThemeText style={tw`font-semibold mb-3`}>
        Schedule for Negotiation appointment
      </ThemeText>
      <ThemeButton label="Pick Date" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <ThemeText>
        Schedule date for physical or virtual meeting for negotiation of pricing
        and sale
      </ThemeText>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
}
