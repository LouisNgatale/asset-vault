import { ResponseCode } from '../../constants/request.ts';

export type LoginDto = {
  phoneNumber: number;
  NIDA: number;
};

export type ResponseError = {
  success: boolean;
  code: ResponseCode;
  message?: string;
};

export type LoginResponse =
  | {
      success: boolean;
      data: {
        user: any;
        accessToken: string;
      };
    }
  | ResponseError;
