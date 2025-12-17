export interface IShop {
  _id: string;
  owner_id: string;
  cooperative_id: string | null;
  name: string;
  description: string;
  category: string;
  logo_url: string;
  banner_url: string;
  is_member_shop: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IOrder {
  _id: string;
  buyer_id: string;
  shop_id: IShop;
  total_amount: number;
  discount: number;
  escrow_status: string;
  payment_status: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IGetAllOrdersResponse {
  success: boolean;
  orders: IOrder[];
}

export interface IGetOrderResponse {
  success: boolean;
  order: IOrder;
}
