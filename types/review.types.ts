<<<<<<< HEAD
import { IUser } from "./auth.types";

export interface IReview {
  _id: string;
  user_id: {
    _id: string;
    firstName: string;
    lastName: string;
    email?: string;
  };
  product_id: string;
  rating: number;
  comment: string;
  createdAt: string;
  __v: number;
}

export interface IReviewsResponse {
  success: boolean;
  data: {
    reviews: IReview[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
    rating_distribution: {
      [key: string]: number;
    };
  };
}

export interface ICreateReviewRequest {
  product_id: string;
  rating: number;
  comment: string;
}

export interface ICreateReviewResponse {
  success: boolean;
  message?: string;
  review?: IReview;
}
=======
import { IUser } from "./auth.types";

export interface IReview {
  _id: string;
  user_id: IUser;
  product_id: string;
  rating: number;
  comment: string;
  createdAt: string;
  __v: number;
}

export interface IReviewsResponse {
  success: boolean;
  reviews: IReview[];
}

export interface ICreateReviewRequest {
  product_id: string;
  rating: number;
  comment: string;
}

export interface ICreateReviewResponse {
  success: boolean;
  message?: string;
  review?: IReview;
}
>>>>>>> coop/join
