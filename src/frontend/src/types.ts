export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type CollectionId = "atelier" | "heritage" | "comfort";

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  description: string;
  collectionId: CollectionId;
  collectionName: string;
  images: string[];
  sizes: ProductSize[];
  availableCount: number;
  stitchCount: number;
  material: string;
  isLimitedEdition: boolean;
  isBestseller: boolean;
  isNew: boolean;
  tags: string[];
}
export interface WishlistItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  image: string;
  addedAt: string;
}

export interface CartItem {
  product: Product;
  size: ProductSize;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  createdAt: string;
  shippingAddress: ShippingAddress;
}

export interface ShippingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Collection {
  id: CollectionId;
  name: string;
  tagline: string;
  description: string;
  image: string;
  productCount: number;
  highlight: string;
}
