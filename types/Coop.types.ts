// types/subscription.ts

export interface JoinCooperativePayload {
  userId: string;
  cooperativeId: string;
  subscriptionTierId: string;
}

export interface ICooperative {
  adminId: string | undefined;
}
