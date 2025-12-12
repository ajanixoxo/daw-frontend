
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
