export interface ICategory {
  _id: string;
  shop_id: string;
  name: string;
  description: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICategoriesResponse {
  success: boolean;
  categories: ICategory[];
}

export interface ICreateCategoryRequest {
  shop_id: string;
  name: string;
  description?: string;
  color?: string;
}

export interface ICreateCategoryResponse {
  success: boolean;
  category: ICategory;
}
