import { ResponseCode } from '../../constants/request.ts';

export type LoginDto = {
  phoneNumber: number;
  NIDA: number;
};

export type RegistrationDto = {
  NIDA: string;
  phoneNumber: string;
  email: string;
  fullName: string;
};

export type AppResponseError = {
  success: boolean;
  code: ResponseCode;
  message?: string;
};

export type LoginResponse = {
  success: boolean;
  data: {
    user: any;
    accessToken: string;
  };
};

export type RegisterResponse = {
  success: boolean;
  data: {
    user: any;
    accessToken: string;
  };
};
