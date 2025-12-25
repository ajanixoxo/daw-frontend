export interface IVerifyNinRequest {
  userId: string;
  nin: string;
}

export interface IKycData {
  id: string;
  address: {
    town: string;
    lga: string;
    state: string;
    addressLine: string;
    city: string | null;
  };
  parentId: string | null;
  status: string;
  reason: string | null;
  dataValidation: boolean;
  selfieValidation: boolean;
  firstName: string;
  middleName: string;
  lastName: string;
  image: string;
  signature: string;
  mobile: string;
  email: string | null;
  birthState: string;
  nokState: string;
  religion: string;
  birthLGA: string;
  birthCountry: string;
  dateOfBirth: string;
  isConsent: boolean;
  idNumber: string;
  businessId: string;
  type: string;
  allValidationPassed: boolean;
  gender: string;
  requestedAt: string;
  requestedById: string;
  country: string;
  createdAt: string;
  lastModifiedAt: string;
  adverseMediaReport: any;
  amlReport: any;
  metadata: Record<string, any>;
  requestedBy: {
    firstName: string;
    lastName: string;
    middleName: string;
    id: string;
  };
}

export interface IVerifyNinResponse {
  success: boolean;
  kycVerified: boolean;
  data: {
    success: boolean;
    statusCode: number;
    message: string;
    data: IKycData;
  };
  links: any[];
}





