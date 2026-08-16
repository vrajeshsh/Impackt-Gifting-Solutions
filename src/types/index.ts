export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  inrPrice: number;
  discount?: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  tags: string[];
  occasions: string[];
  images: string[];
  personalizable: boolean;
  specifications?: Record<string, string>;
  material?: string;
  dimensions?: string;
  availability: 'in_stock' | 'out_of_stock' | 'pre_order';
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  corporateFavorite: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  personalization?: string;
}

export interface Address {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
  landmark?: string;
}

export interface CorporateInquiry {
  name: string;
  companyName: string;
  workEmail: string;
  phone: string;
  numberOfGifts: string;
  budgetPerGift: string;
  eventType: string;
  requiredDeliveryDate: string;
  preferredCategory: string;
  customBranding: boolean;
  packagingRequirements: string;
  additionalRequirements: string;
}
