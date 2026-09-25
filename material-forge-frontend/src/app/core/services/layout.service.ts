import { Injectable, signal, computed, inject, effect, DOCUMENT } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { SIDEBAR_STATE_KEY } from '../constants/app.constants';

export type SidenavMode = 'side' | 'over' | 'push';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private readonly breakpointObserver = inject(BreakpointObserver);

  private readonly _sidenavOpen = signal<boolean>(this.loadSidebarState());
  private readonly _sidenavMode = signal<SidenavMode>('side');
  private readonly _pageTitle = signal<string>('Dashboard');
  private readonly _breadcrumbs = signal<{ label: string; route?: string }[]>([]);

  readonly isMobile = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(map((result) => result.matches)),
    { initialValue: false }
  );

  readonly isTablet = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.Medium])
      .pipe(map((result) => result.matches)),
    { initialValue: false }
  );

  readonly isDesktop = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.Large, Breakpoints.XLarge])
      .pipe(map((result) => result.matches)),
    { initialValue: true }
  );

  readonly sidenavOpen = this._sidenavOpen.asReadonly();
  readonly sidenavMode = this._sidenavMode.asReadonly();
  readonly pageTitle = this._pageTitle.asReadonly();
  readonly breadcrumbs = this._breadcrumbs.asReadonly();

  constructor() {
    // Auto-set sidenav mode and state based on screen size
    effect(() => {
      const mobile = this.isMobile();
      if (mobile) {
        this._sidenavMode.set('over');
        this._sidenavOpen.set(false);
      } else {
        this._sidenavMode.set('side');
        this._sidenavOpen.set(this.loadSidebarState());
      }
    });
  }

  openSidenav(): void {
    this._sidenavOpen.set(true);
    this.saveSidebarState(true);
  }

  closeSidenav(): void {
    this._sidenavOpen.set(false);
    this.saveSidebarState(false);
  }

  toggleSidenav(): void {
    const next = !this._sidenavOpen();
    this._sidenavOpen.set(next);
    this.saveSidebarState(next);
  }

  setPageTitle(title: string): void {
    this._pageTitle.set(title);
  }

  setBreadcrumbs(crumbs: { label: string; route?: string }[]): void {
    this._breadcrumbs.set(crumbs);
  }

  private loadSidebarState(): boolean {
    const saved = localStorage.getItem(SIDEBAR_STATE_KEY);
    return saved === null ? true : saved === 'true';
  }

  private saveSidebarState(open: boolean): void {
    localStorage.setItem(SIDEBAR_STATE_KEY, String(open));
  }
}
