import { ASSET_TYPE, DealStage } from '../constants/asset.ts';

export interface Asset {
  id: string;
  uuid: string;
  type: ASSET_TYPE;
  owner: PartialUser;
  location: AssetLocation;
  dimensions: AssetDimensions;
  isListed: boolean;
  images: string[];
  description?: string;
  valuation?: string;
  parcelNumber: string;
  plotNumber: string;
  titleNumber: string;
  documents: AssetDocument[];
  registeredAt: Date;
  listedOn: Date;
  listingPrice?: string;
}

export interface Deal {
  id: string;
  uuid: string;
  assetUUID: string;
  proposedPrice: string;
  originalContract: string;
  signedContract: string;
  asset: Asset;
  stages: BookingStage[];
  buyer: PartialUser;
  messages: Message[];
}

interface Message {
  id: string;
  text: string;
  createdAt: string;
  user: {
    uuid: string;
    fullName: string;
    avatar: string;
  };
}

export interface BookingStage {
  name: DealStage;
  date: Date;
  metadata: any;
}

interface PartialUser {
  uuid: string;
  fullName: string;
  NIDA: string;
  phoneNumber: string;
}

interface AssetLocation {
  latitude: number;
  longitude: number;
  nearbyLocation: string;
  locationName: string;
}

interface AssetDimensions {
  value: number;
  unit: string;
}

interface AssetDocument {
  type: string;
  url: string;
}
