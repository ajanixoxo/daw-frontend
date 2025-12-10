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
