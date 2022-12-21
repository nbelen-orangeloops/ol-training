import * as Errors from "../../Errors";
import * as Models from "../../models";

export type AuthenticatedRequest = {
  accessToken: Models.AccessToken;
};

export type FetchUserRequest = AuthenticatedRequest;
export type SuccessfulFetchUserResponse = {
  success: true;
  user: Models.User;
};
export type FailedFetchUserResponse = {
  success: false;
  user?: undefined;
  error: Errors.NetworkError | Errors.GenericError;
};
export type FetchUserResponse = SuccessfulFetchUserResponse | FailedFetchUserResponse;

export type RefreshTokenRequest = {
  refreshToken: string;
};
export type SuccessfulRefreshTokenResponse = {
  success: true;
  accessToken: Models.AccessToken;
};
export type FailedRefreshTokenResponse = {
  success: false;
  error: Errors.NetworkError | Errors.GenericError;
};
export type RefreshTokenResponse = SuccessfulRefreshTokenResponse | FailedRefreshTokenResponse;

export type SignInRequest = {
  email: string;
  password: string;
};
export type SuccessfulSignInResponse = {
  success: true;
  accessToken: Models.AccessToken;
};
export type FailedSignInResponse = {
  success: false;
  error: Errors.NetworkError | Errors.GenericError;
};
export type SignInResponse = SuccessfulSignInResponse | FailedSignInResponse;

export type SignUpRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  upload?: any;
};
export type SuccessfulSignUpResponse = {
  success: true;
};
export type FailedSignUpResponse = {
  success: false;
  error: Errors.NetworkError | Errors.GenericError;
};
export type SignUpResponse = SuccessfulSignUpResponse | FailedSignUpResponse;

export type UpdateUserRequest = AuthenticatedRequest & {
  id: string;
  firstName?: string;
  lastName?: string;
  upload?: any;
};
export type SuccessfulUpdateUserResponse = {
  success: true;
  user: Models.User;
};
export type FailedUpdateUserResponse = {
  success: false;
  error: Errors.NetworkError | Errors.GenericError;
};
export type UpdateUserResponse = SuccessfulUpdateUserResponse | FailedUpdateUserResponse;

export type RequestResetPasswordRequest = {
  email: string;
};
export type SuccessfulRequestResetPasswordResponse = {
  success: true;
};
export type FailedRequestResetPasswordResponse = {
  success: false;
  error: Errors.NetworkError | Errors.GenericError;
};
export type RequestResetPasswordResponse = SuccessfulRequestResetPasswordResponse | FailedRequestResetPasswordResponse;
