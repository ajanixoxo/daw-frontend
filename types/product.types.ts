export interface IProductVariant {
  type: string;
  values: string[];
}

export interface IProduct {
  _id: string;
  shop_id: string;
  name: string;
  quantity: number;
  price: number;
  currency?: "NGN" | "USD";
  displayPrice?: number;
  displayCurrency?: "NGN" | "USD";
  images: string[];
  status: "available" | "unavailable" | "draft" | "out_of_stock";
  description?: string;
  category?: string;
  variants?: IProductVariant[];
  productFeatures?: string;
  careInstruction?: string;
  returnPolicy?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IProductsResponse {
  message: string;
  products: IProduct[];
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface ICart {
  items: ICartItem[];
  total: number;
}

export interface IAddToCartRequest {
  productId: string;
  quantity: number;
}

export interface IAddToCartResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    cart_id: string;
    product_id: IProduct | string;
    quantity: number;
    price: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export interface ICartResponse {
  success: boolean;
  data: {
    cart_id: string;
    items: Array<{
      _id: string;
      product: IProduct;
      quantity: number;
      price: number;
      subtotal: number;
      in_stock: boolean;
      max_available: number;
    }>;
    total_items: number;
    total_amount: number;
  };
}

import { IShop } from "./shop.types";

export interface IOrderItem {
  product_name: string;
  quantity: number;
  price_at_purchase: number;
  subtotal: number;
}

export interface IOrder {
  _id: string;
  buyer_id: string | { _id: string; [key: string]: any };
  shop_id: string | IShop;
  total_amount: number;
  discount: number;
  escrow_status: "pending" | "completed" | "released" | "refunded";
  payment_status: "paid" | "unpaid" | "partial";
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "in_transit" | "disputed";
  items?: IOrderItem[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IOrderResponse {
  success: boolean;
  order: IOrder;
}

export interface IOrdersResponse {
  success: boolean;
  orders?: IOrder[];
  message?: string;
}
export interface IAddProductRequest {
  shop_id: string;
  name: string;
  quantity: number;
  price: number;
  description?: string;
  category?: string;
  images?: File[];
  status?: "available" | "unavailable" | "draft" | "out_of_stock";
  variants?: IProductVariant[];
  productFeatures?: string;
  careInstruction?: string;
  returnPolicy?: string;
}

export interface IAddProductResponse {
  success: boolean;
  product: IProduct;
}

export interface IActionResponse<T = void> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
