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
  logisticsInfo: string;
}

export interface IPaymentInitiateResponse {
  status: boolean;
  redirectUrl: string;
  reference: string;
  paymentId: string;
}
