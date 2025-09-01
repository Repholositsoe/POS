export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  address?: string;
  city: string;
  loyaltyPoints: number;
  totalSpent: number;
  lastVisit: Date;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Sale {
  id: string;
  customerId?: string;
  customerName: string;
  items: SaleItem[];
  total: number;
  paymentMethod: 'Cash' | 'Card' | 'Mobile Money';
  status: 'Completed' | 'Refunded' | 'Pending';
  date: Date;
  createdAt: Date;
}

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}