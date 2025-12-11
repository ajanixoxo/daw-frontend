export interface IProduct {
  _id: string;
  shop_id: string;
  name: string;
  quantity: number;
  price: number;
  images: string[];
  status: 'available' | 'unavailable' | 'out_of_stock';
  description?: string;
  category?: string;
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
  price: number;
}

export interface IAddToCartResponse {
  success: boolean;
  item: {
    cart_id: string;
    product_id: string;
    quantity: number;
    price: number;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export interface ICartResponse {
  success: boolean;
  items: Array<{
    _id: string;
    cart_id: string;
    product_id: IProduct;
    quantity: number;
    price: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }>;
}

export interface IOrder {
  _id: string;
  user_id: string;
  products: {
    product_id: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface IOrdersResponse {
  message: string;
  orders: IOrder[];
}
export interface IActionResponse<T = void> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
