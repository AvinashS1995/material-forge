import { Component, inject, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ReusableTableComponent } from '../../../shared/components/reusable-table/reusable-table.component';
import { ReusableButtonComponent } from '../../../shared/components/reusable-button/reusable-button.component';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { SalesService } from '../../../core/services/sales.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Customer, Product, Order, ORDER_STATUS_COLORS } from '../../../core/models/sales.model';
import { TableColumn, TableAction, ActionEvent } from '../../../shared/models/table.model';
import { StatCard } from '../../../shared/models/card.model';

@Component({
  selector: 'app-sales-dashboard',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatTabsModule, MatChipsModule,
    PageHeaderComponent, ReusableTableComponent, ReusableButtonComponent, StatCardComponent,
  ],
  templateUrl: './sales-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesDashboardComponent implements OnInit {
  private readonly salesService = inject(SalesService);
  readonly notification = inject(NotificationService);

  readonly loadingOrders = signal(true);
  readonly orders = signal<Order[]>([]);
  readonly customers = signal<Customer[]>([]);
  readonly products = signal<Product[]>([]);

  get statCards(): StatCard[] {
    return [
      { id: 'revenue', title: 'Total Revenue', value: `₹${(this.salesService.totalRevenue() / 100000).toFixed(1)}L`, icon: 'currency_rupee', iconBg: '#4caf50', iconColor: '#fff' },
      { id: 'orders', title: 'Total Orders', value: this.orders().length, icon: 'shopping_cart', iconBg: '#2196f3', iconColor: '#fff' },
      { id: 'pending', title: 'Pending Orders', value: this.salesService.pendingOrders(), icon: 'pending', iconBg: '#ff9800', iconColor: '#fff' },
      { id: 'customers', title: 'Customers', value: this.customers().length, icon: 'groups', iconBg: '#9c27b0', iconColor: '#fff' },
    ];
  }

  readonly orderColumns: TableColumn<Order>[] = [
    { key: 'orderId', header: 'Order ID', width: '100px' },
    { key: 'customerName', header: 'Customer', sortable: true },
    { key: 'orderDate', header: 'Date', type: 'date', sortable: true },
    { key: 'total', header: 'Total', type: 'currency', sortable: true, align: 'right' },
    { key: 'status', header: 'Status', type: 'badge', badgeConfig: { colorMap: ORDER_STATUS_COLORS } },
    { key: 'paymentStatus', header: 'Payment', sortable: true },
  ];

  readonly customerColumns: TableColumn<Customer>[] = [
    { key: 'customerId', header: 'ID', width: '100px' },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    { key: 'city', header: 'City', sortable: true },
    { key: 'totalOrders', header: 'Orders', align: 'center', sortable: true },
    { key: 'totalSpend', header: 'Total Spend', type: 'currency', sortable: true, align: 'right' },
  ];

  readonly orderActions: TableAction<Order>[] = [
    { id: 'view', label: 'View', icon: 'visibility', color: 'primary' },
    { id: 'invoice', label: 'Invoice', icon: 'receipt' },
  ];

  ngOnInit(): void {
    this.salesService.getOrders().subscribe((data) => {
      this.orders.set(data);
      this.loadingOrders.set(false);
    });
    this.salesService.getCustomers().subscribe((data) => this.customers.set(data));
    this.salesService.getProducts().subscribe((data) => this.products.set(data));
  }

  onOrderAction(event: ActionEvent<Order>): void {
    this.notification.info(`${event.actionId}: Order ${event.row.orderId}`);
  }
}
