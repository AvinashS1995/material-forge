import { Injectable, signal, computed } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Customer, Product, Order, PRODUCT_CATEGORIES } from '../models/sales.model';

const MOCK_CUSTOMERS: Customer[] = [
  { id: '1', customerId: 'CUST001', name: 'Tech Solutions Pvt Ltd', email: 'info@techsol.com', phone: '+91 98765 00001', company: 'Tech Solutions', address: '101 GIDC', city: 'Ahmedabad', state: 'Gujarat', country: 'India', totalOrders: 12, totalSpend: 540000 },
  { id: '2', customerId: 'CUST002', name: 'Digital Ventures', email: 'contact@digitalv.com', phone: '+91 87654 00002', company: 'Digital Ventures', address: '202 IT Park', city: 'Pune', state: 'Maharashtra', country: 'India', totalOrders: 8, totalSpend: 320000 },
  { id: '3', customerId: 'CUST003', name: 'StartUp Hub', email: 'hello@startuphub.in', phone: '+91 76543 00003', address: '303 Baner Road', city: 'Pune', state: 'Maharashtra', country: 'India', totalOrders: 5, totalSpend: 185000 },
];

const MOCK_PRODUCTS: Product[] = [
  { id: '1', productId: 'PRD001', name: 'Angular Pro License', category: 'Software', sku: 'ANG-PRO-001', price: 15000, stock: 999, unit: 'license' },
  { id: '2', productId: 'PRD002', name: 'UI Component Pack', category: 'Software', sku: 'UI-COMP-002', price: 8500, stock: 999, unit: 'license' },
  { id: '3', productId: 'PRD003', name: 'Developer Keyboard', category: 'Hardware', sku: 'KB-DEV-003', price: 4500, stock: 50, unit: 'unit' },
  { id: '4', productId: 'PRD004', name: '27" Monitor', category: 'Hardware', sku: 'MON-27-004', price: 28000, stock: 20, unit: 'unit' },
  { id: '5', productId: 'PRD005', name: 'Annual Support Plan', category: 'Services', sku: 'SUP-ANN-005', price: 25000, stock: 999, unit: 'subscription' },
];

const MOCK_ORDERS: Order[] = [
  {
    id: '1', orderId: 'ORD001', customerId: '1', customerName: 'Tech Solutions Pvt Ltd',
    orderDate: new Date('2026-09-01'), deliveryDate: new Date('2026-09-10'),
    items: [{ productId: '1', productName: 'Angular Pro License', quantity: 5, unitPrice: 15000, total: 75000 }],
    subtotal: 75000, tax: 13500, total: 88500, status: 'delivered', paymentStatus: 'paid',
  },
  {
    id: '2', orderId: 'ORD002', customerId: '2', customerName: 'Digital Ventures',
    orderDate: new Date('2026-09-15'), items: [
      { productId: '3', productName: 'Developer Keyboard', quantity: 10, unitPrice: 4500, total: 45000 },
      { productId: '4', productName: '27" Monitor', quantity: 5, unitPrice: 28000, total: 140000 },
    ],
    subtotal: 185000, tax: 33300, total: 218300, status: 'processing', paymentStatus: 'partial',
  },
  {
    id: '3', orderId: 'ORD003', customerId: '3', customerName: 'StartUp Hub',
    orderDate: new Date('2026-09-20'),
    items: [{ productId: '5', productName: 'Annual Support Plan', quantity: 1, unitPrice: 25000, total: 25000 }],
    subtotal: 25000, tax: 4500, total: 29500, status: 'pending', paymentStatus: 'unpaid',
  },
];

@Injectable({ providedIn: 'root' })
export class SalesService {
  private customers = signal<Customer[]>(MOCK_CUSTOMERS);
  private products = signal<Product[]>(MOCK_PRODUCTS);
  private orders = signal<Order[]>(MOCK_ORDERS);

  readonly allCustomers = this.customers.asReadonly();
  readonly allProducts = this.products.asReadonly();
  readonly allOrders = this.orders.asReadonly();

  readonly totalRevenue = computed(() =>
    this.orders().filter(o => o.paymentStatus === 'paid').reduce((sum, o) => sum + o.total, 0)
  );
  readonly pendingOrders = computed(() =>
    this.orders().filter(o => o.status === 'pending').length
  );

  getCustomers(): Observable<Customer[]> { return of(this.customers()).pipe(delay(300)); }
  getProducts(): Observable<Product[]> { return of(this.products()).pipe(delay(300)); }
  getOrders(): Observable<Order[]> { return of(this.orders()).pipe(delay(300)); }

  createOrder(order: Omit<Order, 'id' | 'orderId'>): Observable<Order> {
    const newOrder: Order = {
      ...order,
      id: crypto.randomUUID(),
      orderId: `ORD${String(this.orders().length + 1).padStart(3, '0')}`,
    };
    this.orders.update((list) => [...list, newOrder]);
    return of(newOrder).pipe(delay(400));
  }

  updateOrderStatus(id: string, status: Order['status']): Observable<void> {
    this.orders.update((list) => list.map((o) => (o.id === id ? { ...o, status } : o)));
    return of(undefined).pipe(delay(300));
  }

  getProductCategories(): string[] { return PRODUCT_CATEGORIES; }
}
