export interface IResponseValidationInnerError {
  property: string;
  value: any;
  constraints?: {
    [type: string]: string;
  };
  children?: IResponseValidationInnerError[];
  errorCode?: string;
}

export interface IError {
  [name: string]: string;
}

export interface IResponseError {
  message: string;
  code?: string;
  errorMessage?: string;
  status?: number;
  errorCode?: string;
  error?: IError | IResponseValidationInnerError[];
  data?: any;
}
