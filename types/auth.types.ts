export interface ISessionData {
  userId: string;
  role: string;
  email: string;
  isVerified: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isVerified: boolean;
  kyc_status?: string;
  role: string;
  status: string;
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
  role: "registered_shopper" | "admin" ;
}

export interface ILoginResponse {
  message: string;
  user: IUser;
  token: {
    accessToken: string;
    refreshToken: string;
  };
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
    role: string;
  };
  token: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface IActionResponse<T = void> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}