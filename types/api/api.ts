import { LoginResponse } from "./auth";

export type APIError = {
  error: string;
  message?: string;
};

export type SuccessResponse<T> = {
  message: string;
  data: T;
  success?: boolean;
};

export type LoginApiResponse = LoginResponse | APIError;
