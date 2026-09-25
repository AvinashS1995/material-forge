export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'partial' | 'paid' | 'refunded';

export interface Customer {
  id: string;
  customerId: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  totalOrders?: number;
  totalSpend?: number;
}

export interface Product {
  id: string;
  productId: string;
  name: string;
  category: string;
  sku: string;
  price: number;
  stock: number;
  unit: string;
  imageUrl?: string;
  description?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  discount?: number;
  total: number;
}

export interface Order {
  id: string;
  orderId: string;
  customerId: string;
  customerName?: string;
  orderDate: Date | null;
  deliveryDate?: Date | null;
  items: OrderItem[];
  subtotal: number;
  discount?: number;
  tax?: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  notes?: string;
}

export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Software',
  'Hardware',
  'Services',
  'Accessories',
  'Peripherals',
  'Networking',
  'Storage',
];

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'orange',
  confirmed: 'blue',
  processing: 'purple',
  shipped: 'cyan',
  delivered: 'green',
  cancelled: 'red',
};

export const PAYMENT_STATUS_COLORS: Record<PaymentStatus, string> = {
  unpaid: 'red',
  partial: 'orange',
  paid: 'green',
  refunded: 'blue',
};
