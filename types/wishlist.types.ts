<<<<<<< HEAD

import { IProduct } from "./product.types";

export interface IWishlistItem {
  _id: string;
  user_id?: string; // Optional as it might not be in the item object based on the snippet
  product: IProduct;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface IWishlistResponse {
  success: boolean;
  count: number;
  data: IWishlistItem[];
  message?: string;
}
=======

import { IProduct } from "./product.types";

export interface IWishlistItem {
  _id: string;
  user_id: string;
  product_id: IProduct;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IWishlistResponse {
  success: boolean;
  items: IWishlistItem[];
  message?: string;
}
>>>>>>> coop/join
