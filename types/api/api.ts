import { LoginResponse } from "./auth";

export type APIError = {
  error: string;
  message?: string;
};

export type SuccessResponse<T> = {
  message: string;
  data: T;
};

export type LoginApiResponse = LoginResponse | APIError;
