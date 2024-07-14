export interface ProductPhotoType {
  model_name: string;
  model_id: string;
  organization_id: string;
  filename: string;
  url: string;
  is_featured: boolean;
  save_as_jpg: boolean;
  is_public: boolean;
  file_rename: boolean;
  position: number;
}

export interface ProductCategoryTyoe {
  organization_id: string;
  name: string;
  position: string | number;
  category_type: string;
  description: string;
  last_updated: string;
  id: string;
  parent_id: string;
  url_slug: string;
  is_deleted?: boolean;
  date_created: string;
  subcategories?: [];
  parents?: [];
  entity_items?: [];
  photos?: [],
}

export interface Currency {
  NGN: Array<number>;
}

export interface ProductType {
  name: string;
  description: string;
  unique_id: string;
  url_slug: string;
  is_available: boolean;
  is_service: boolean;
  previous_url_slugs: string;
  unavailable: boolean;
  unavailable_start: string;
  unavailable_end: string;
  id: string;
  parent_product_id: string;
  parent: string;
  organization_id: string;
  product_image: ProductPhotoType[];
  categories: Array<ProductCategoryTyoe>;
  date_created: string;
  last_updated: string;
  user_id: string;
  photos: Array<ProductPhotoType>;
  current_price: number;
  is_deleted: boolean;
  available_quantity: number | string;
  selling_price: number | string;
  discounted_price: number | string;
  buying_price: number | string;
  extra_infos: [];
  quantity?: number;
}

export interface ProductListArray {
  page: number;
  size: number;
  total: number;
  debug?: null;
  previous_page: string | null;
  next_page: string | null;
  items: Array<ProductType>;
}

export interface ProductDetailType {
  name: string;
  description: string;
  unique_id: string;
  url_slug: string;
  is_available: boolean;
  is_service: boolean;
  previous_url_slugs: string;
  unavailable: boolean;
  unavailable_start: string;
  unavailable_end: string;
  id: string;
  parent_product_id: string;
  parent: string;
  organization_id: string;
  product_image: ProductPhotoType[];
  categories: Array<ProductCategoryTyoe>;
  date_created: string;
  last_updated: string;
  user_id: string;
  photos: Array<ProductPhotoType>;
  current_price: number;
  is_deleted: boolean;
  available_quantity: number | string;
  selling_price: number | string;
  discounted_price: number | string;
  buying_price: number | string;
  extra_infos: [];
  quantity?: number;
}
