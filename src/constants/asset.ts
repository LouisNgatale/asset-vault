export enum ASSET_TYPE {
  LAND = 'LAND',
  BUILDING = 'BUILDING',
  MOTOR_VEHICLE = 'MOTOR_VEHICLE',
}

export enum DealStage {
  OFFER = 'OFFER',
  NEGOTIATION = 'NEGOTIATION',
  CONTRACT_DRAFTING = 'CONTRACT_DRAFTING',
  CONTRACT_SIGNING = 'CONTRACT_SIGNING',
  PAYMENT = 'PAYMENT',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export const DealStepsCounter = {
  [DealStage.OFFER]: 0,
  [DealStage.NEGOTIATION]: 1,
  [DealStage.CONTRACT_DRAFTING]: 2,
  [DealStage.CONTRACT_SIGNING]: 3,
  [DealStage.PAYMENT]: 4,
  [DealStage.COMPLETED]: 5,
  [DealStage.CANCELLED]: -1,
};
