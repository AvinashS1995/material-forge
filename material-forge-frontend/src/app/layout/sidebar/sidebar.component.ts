import {
  Component, inject, ChangeDetectionStrategy, signal, computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { NAV_CATEGORIES } from '../../core/constants/navigation.constants';
import { NavCategory, NavItem } from '../../core/models/navigation.model';
import { LayoutService } from '../../core/services/layout.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule, RouterModule, RouterLinkActive,
    MatListModule, MatIconModule, MatButtonModule,
    MatTooltipModule, MatBadgeModule, MatDividerModule, MatExpansionModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  readonly layoutService = inject(LayoutService);
  readonly categories = NAV_CATEGORIES;
  readonly expandedCategories = signal<Set<string>>(new Set(['main', 'form-controls', 'data']));

  isCategoryExpanded(id: string): boolean {
    return this.expandedCategories().has(id);
  }

  toggleCategory(id: string): void {
    this.expandedCategories.update((set) => {
      const next = new Set(set);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  expandAll(): void {
    this.expandedCategories.set(new Set(this.categories.map((c) => c.id)));
  }

  collapseAll(): void {
    this.expandedCategories.set(new Set(['main']));
  }

  closeSidenavIfMobile(): void {
    if (this.layoutService.isMobile()) {
      this.layoutService.closeSidenav();
    }
  }
}
