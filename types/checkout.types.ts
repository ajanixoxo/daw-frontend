export interface IPlaceOrderRequest {
  items: {
    product_id: string;
    quantity: number;
  }[];
}

export interface IPlaceOrderResponse {
  success: boolean;
  order: {
    buyer_id: string;
    shop_id: string;
    total_amount: number;
    discount: number;
    escrow_status: string;
    payment_status: string;
    status: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  orders: any[]; // Support for multiple shop orders
  orderIds: string[]; // List of all order IDs
  orderItems: {
    order_id: string;
    product_id: string;
    quantity: number;
    price: number;
    _id: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface IPaymentInitiateRequest {
  description: string;
  name: string;
  orderId: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  address: string[];
  DeliveryAddress: string;
  zipCode: string;
  amount: number;
  logisticsInfo?: string;
}

export interface IPaymentInitiateResponse {
  status: boolean;
  redirectUrl: string;
  reference: string;
  paymentId: string;
}

// ── Shared billing fields sent to every payment provider ─────────────────────
export interface IPaymentBillingFields {
  description: string;
  name: string;
  orderId: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  address: string[];
  DeliveryAddress: string;
  zipCode: string;
  logisticsInfo?: string;
}

// ── Paystack ──────────────────────────────────────────────────────────────────
export interface IPaystackInitiateRequest extends IPaymentBillingFields {}

export interface IPaystackInitiateResponse {
  success: boolean;
  paymentId: string;
  reference: string;
  authorizationUrl: string;
}

export interface IPaystackVerifyResponse {
  success: boolean;
  message: string;
  reference: string;
  gatewayReference?: string;
  status: string;
}

// ── PayPal ────────────────────────────────────────────────────────────────────
export interface IPaypalCreateOrderRequest extends IPaymentBillingFields {}

export interface IPaypalCreateOrderResponse {
  success: boolean;
  paymentId: string;
  paypalOrderId: string;
  approvalUrl: string;
}

export interface IPaypalCaptureResponse {
  success: boolean;
  message: string;
  captureId?: string;
  status: string;
}

export interface IPaymentVerifyResponse {
  success: boolean;
  status: string;
  payment: {
    _id: string;
    userId: string;
    amount: number;
    description: string;
    currency: string;
    transactionReference: string;
    redirectUrl: string;
    channel: string;
    vigipayStatus: string;
    amountAfterCharge: number;
    charge: number;
    rawResponse: any;
    orderId: string;
    name: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    address: string[];
    zipCode: string;
    logisticsInfo: string;
    DeliveryAddress: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}
