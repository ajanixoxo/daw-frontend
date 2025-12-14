export interface ISessionData {
  userId: string;
  role: string;
  email: string;
  isVerified: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface IMember {
  memberId: string;
  cooperativeId: string;
  status: string;
  joinDate?: string;
  monthlyContribution?: number;
  subscriptionTierId?: string;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isVerified: boolean;
  kyc_status?: string;
  roles: string[];
  status: string;
  shop?: string; // Shop ID
  member?: IMember[]; // Array of member objects with cooperativeId
  createdAt?: string;
  updatedAt?: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ISignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  roles: "buyer" | "admin" | "vendor";
}

export interface ILoginResponse {
  message: string;
  user: IUser;
  token: {
    accessToken: string;
    refreshToken: string;
  } | string;
}

export interface ISignupResponse {
  success: boolean;
  message: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    verified: boolean;
    roles: string[];
  };
  token: string;
}

export interface IActionResponse<T = void> {
  success: boolean;
  data?: T;
  user?: IUser;
  error?: string;
  message?: string;
}

export interface IOtpRequest {
  otp: string;
  email?: string;
}

export interface IVerifyEmailResponse {
  success: boolean;
  message: string;
}

export interface IForgotPasswordRequest {
  email: string;
}

export interface IForgotPasswordResponse {
  message: string;
  token: string;
}

export interface IResetPasswordRequest {
  otp: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface IResetPasswordResponse {
  message: string;
}

export interface IOtpResponse {
  message: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    otp: null;
    isVerified: boolean;
    kyc_status: string;
    kycVerified: boolean;
    roles: string[];
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IRefreshTokenRequest {
  refreshToken: string;
}

export interface IRefreshTokenResponse {
  success: boolean;
  message: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
}