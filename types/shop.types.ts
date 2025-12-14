export interface ICreateShopRequest {
  name: string;
  description: string;
  category: string;
  logo_url?: string;
  banner_url?: string;
  is_member_shop: boolean;
  cooperative_id?: string | null;
}

export interface IShop {
  _id: string;
  owner_id: string;
  cooperative_id: string | null;
  name: string;
  description: string;
  category: string;
  logo_url?: string;
  banner_url?: string;
  is_member_shop: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface ICreateShopResponse {
  success: boolean;
  shop: IShop;
}

export interface IGetShopResponse {
  success: boolean;
  shop: IShop;
}


