import { Injectable, computed } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ComponentStats } from '../models/component-doc.model';
import { StatCard } from '../../shared/models/card.model';
import { COMPONENT_REGISTRY } from '../constants/component-registry.constants';
import { NAV_CATEGORIES } from '../constants/navigation.constants';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  getComponentStats(): Observable<ComponentStats> {
    const all = NAV_CATEGORIES.flatMap((c) => c.items).filter((i) => i.id !== 'dashboard' && !['employee', 'patient', 'sales'].includes(i.id));

    const stats: ComponentStats = {
      total: all.length,
      formControls: NAV_CATEGORIES.find((c) => c.id === 'form-controls')?.items.length ?? 0,
      data: NAV_CATEGORIES.find((c) => c.id === 'data')?.items.length ?? 0,
      navigation: NAV_CATEGORIES.find((c) => c.id === 'navigation')?.items.length ?? 0,
      surface: NAV_CATEGORIES.find((c) => c.id === 'surface')?.items.length ?? 0,
      feedback: NAV_CATEGORIES.find((c) => c.id === 'feedback')?.items.length ?? 0,
      utilities: NAV_CATEGORIES.find((c) => c.id === 'utilities')?.items.length ?? 0,
    };
    return of(stats).pipe(delay(200));
  }

  getStatCards(stats: ComponentStats): StatCard[] {
    return [
      {
        id: 'total',
        title: 'Total Components',
        value: stats.total,
        subtitle: 'Reusable components',
        icon: 'widgets',
        iconColor: '#fff',
        iconBg: '#3f51b5',
        route: '/components',
      },
      {
        id: 'form-controls',
        title: 'Form Controls',
        value: stats.formControls,
        subtitle: 'Input, Select, Datepicker…',
        icon: 'edit',
        iconColor: '#fff',
        iconBg: '#4caf50',
        route: '/components/input',
      },
      {
        id: 'data',
        title: 'Data Components',
        value: stats.data,
        subtitle: 'Table, Tree, List…',
        icon: 'table_chart',
        iconColor: '#fff',
        iconBg: '#ff9800',
        route: '/components/table',
      },
      {
        id: 'navigation',
        title: 'Navigation',
        value: stats.navigation,
        subtitle: 'Menu, Tabs, Stepper…',
        icon: 'navigation',
        iconColor: '#fff',
        iconBg: '#9c27b0',
        route: '/components/tabs',
      },
      {
        id: 'surface',
        title: 'Surface',
        value: stats.surface,
        subtitle: 'Card, Dialog, Sheet…',
        icon: 'layers',
        iconColor: '#fff',
        iconBg: '#00bcd4',
        route: '/components/card',
      },
      {
        id: 'feedback',
        title: 'Feedback',
        value: stats.feedback,
        subtitle: 'Snackbar, Progress…',
        icon: 'notifications_active',
        iconColor: '#fff',
        iconBg: '#f44336',
        route: '/components/snackbar',
      },
    ];
  }

  getRecentComponents() {
    return NAV_CATEGORIES.flatMap((c) =>
      c.items
        .filter((i) => i.isNew)
        .map((i) => ({ ...i, category: c.label }))
    );
  }
}
