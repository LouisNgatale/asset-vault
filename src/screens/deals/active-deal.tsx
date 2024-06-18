import React, { useState } from 'react';
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
import { Deal } from '../../types/asset.ts';
import { DealStage, DealStepsCounter } from '../../constants/asset.ts';

export default function ActiveDeal({ route }: { route: any }) {
  const deal = route.params.deal as Deal;

  const lastDealStage = deal.stages[deal.stages.length - 1];
  const [step, setStep] = useState(DealStepsCounter[lastDealStage.name] || 0);

  const handleNextStep = () => {
    setStep((currStep) => {
      if (currStep < 4) {
        currStep++;
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
          <Offer
            nextStep={handleNextStep}
            previousStep={handlePreviousStep}
            deal={deal}
          />
        </Content>
      ),
    },
    {
      id: 1,
      title: <Title>Negotiation</Title>,
      content: (
        <Content key={DealStage.NEGOTIATION}>
          <Negotiation
            nextStep={handleNextStep}
            previousStep={handlePreviousStep}
            deal={deal}
          />
        </Content>
      ),
    },
    {
      id: 2,
      title: <Title>Contract Drafting</Title>,
      content: (
        <Content>
          <ContractDrafting
            nextStep={handleNextStep}
            previousStep={handlePreviousStep}
            deal={deal}
          />
        </Content>
      ),
    },
    {
      id: 3,
      title: <Title>Signature</Title>,
      content: (
        <Content>
          <Signature
            nextStep={handleNextStep}
            previousStep={handlePreviousStep}
            deal={deal}
          />
        </Content>
      ),
    },
    {
      id: 4,
      title: <Title>Payments</Title>,
      content: (
        <Content>
          <TitleIssuance
            nextStep={handleNextStep}
            previousStep={handlePreviousStep}
            deal={deal}
          />
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
