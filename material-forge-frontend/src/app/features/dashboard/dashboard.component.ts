import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { DashboardService } from '../../core/services/dashboard.service';
import { ComponentStats } from '../../core/models/component-doc.model';
import { StatCard } from '../../shared/models/card.model';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { SkeletonLoaderComponent } from '../../shared/components/skeleton-loader/skeleton-loader.component';
import { NAV_CATEGORIES } from '../../core/constants/navigation.constants';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    MatCardModule, MatIconModule, MatButtonModule, MatDividerModule,
    MatChipsModule, MatBadgeModule,
    StatCardComponent, PageHeaderComponent, SkeletonLoaderComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);

  readonly loading = signal(true);
  readonly stats = signal<ComponentStats | null>(null);
  readonly statCards = signal<StatCard[]>([]);
  readonly recentComponents = signal<{ id: string; label: string; icon?: string; route?: string; category: string }[]>([]);
  readonly categories = NAV_CATEGORIES.filter((c) => c.id !== 'main' && c.id !== 'examples');

  ngOnInit(): void {
    this.dashboardService.getComponentStats().subscribe((stats) => {
      this.stats.set(stats);
      this.statCards.set(this.dashboardService.getStatCards(stats));
      this.recentComponents.set(this.dashboardService.getRecentComponents());
      this.loading.set(false);
    });
  }
}
