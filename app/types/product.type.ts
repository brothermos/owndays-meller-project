export type ProductResponse = {
  success: boolean;
  total: number;
  data: ProductItem[];
};

export type ProductItem = {
  product: {
    id: number;
    code: string;
    model_name: string;
  };
  localization: {
    description: string;
  };
  selling_setting: {
    price: number;
    in_stock: number;
  };
  frame_types: Array<{
    code: string;
  }>;
  skus: ProductSku[];
};

export type ProductSku = {
  id: number;
  code: string;
  colors: ProductColor[];
  images: ProductImage[];
};

export type ProductColor = {
  name: string;
  path: string | null;
  hex_code: string | null;
};

export type ProductImage = {
  path: string;
  order: number;
};
