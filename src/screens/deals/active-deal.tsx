import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import ProgressSteps, {
  Content,
  Title,
} from '@joaosousa/react-native-progress-steps';
import tw from '../../lib/tailwind.ts';
import Offer from '../../components/order-steps/offer.tsx';
import Negotiation from '../../components/order-steps/negotiation.tsx';
import ContractDrafting from '../../components/order-steps/contract-drafting.tsx';
import Signature from '../../components/order-steps/signature.tsx';
import TitleIssuance from '../../components/order-steps/title-issuance.tsx';

export default function ActiveDeal() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    console.log({ step });
  }, [step]);

  const handleNextStep = () => {
    setStep((currStep) => {
      console.log({ next: currStep++ });
      if (currStep < 4) {
        return currStep++;
      }

      return currStep;
    });
  };
  const handlePreviousStep = () => {
    setStep((currStep) => {
      if (currStep > 0) {
        return currStep--;
      }

      return currStep;
    });
  };

  const steps = [
    {
      id: 0,
      title: <Title>Offer Purchase</Title>,
      content: (
        <Content>
          <Offer nextStep={handleNextStep} previousStep={handlePreviousStep} />
        </Content>
      ),
    },
    {
      id: 1,
      title: <Title>Negotiation</Title>,
      content: (
        <Content>
          <Negotiation />
        </Content>
      ),
    },
    {
      id: 2,
      title: <Title>Contract Drafting</Title>,
      content: (
        <Content>
          <ContractDrafting />
        </Content>
      ),
    },
    {
      id: 3,
      title: <Title>Signature</Title>,
      content: (
        <Content>
          <Signature />
        </Content>
      ),
    },
    {
      id: 4,
      title: <Title>Title Issuance</Title>,
      content: (
        <Content>
          <TitleIssuance />
        </Content>
      ),
    },
  ];

  return (
    <SafeAreaView style={tw`flex-1 w-full bg-white`}>
      <View style={tw`flex-1 p-3`}>
        <ProgressSteps
          orientation={'horizontal'}
          currentStep={step}
          steps={steps}
          colors={{
            title: {
              text: {
                normal: '#d58e5e',
                active: '#a24f17',
                completed: '#c45508',
              },
            },
            marker: {
              text: {
                normal: '##d58e5e',
                active: '#a24f17',
                completed: '#f4f3ee',
              },
              line: {
                normal: '#d58e5e',
                active: '#a24f17',
                completed: '#a24f17',
              },
            },
          }}
        />
      </View>
    </SafeAreaView>
  );
}
