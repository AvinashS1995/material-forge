import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResult, SearchState } from '../models/search.model';
import { COMPONENT_SEARCH_INDEX } from '../constants/navigation.constants';
import { MIN_SEARCH_LENGTH } from '../constants/app.constants';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly router = inject(Router);

  private readonly _state = signal<SearchState>({
    query: '',
    results: [],
    loading: false,
    open: false,
  });

  readonly state = this._state.asReadonly();
  readonly query = computed(() => this._state().query);
  readonly results = computed(() => this._state().results);
  readonly loading = computed(() => this._state().loading);
  readonly isOpen = computed(() => this._state().open);
  readonly hasResults = computed(() => this._state().results.length > 0);

  search(query: string): void {
    this._state.update((s) => ({ ...s, query, loading: true }));

    if (!query || query.trim().length < MIN_SEARCH_LENGTH) {
      this._state.update((s) => ({ ...s, results: [], loading: false }));
      return;
    }

    const q = query.toLowerCase().trim();
    const results: SearchResult[] = COMPONENT_SEARCH_INDEX
      .filter((item) => {
        const inLabel = item.label.toLowerCase().includes(q);
        const inDesc = item.description?.toLowerCase().includes(q) ?? false;
        const inCategory = item.category.toLowerCase().includes(q);
        return inLabel || inDesc || inCategory;
      })
      .map((item) => ({
        id: item.id,
        label: item.label,
        description: item.description,
        category: item.category,
        icon: item.icon,
        route: item.route ?? '',
        tags: [],
      }));

    this._state.update((s) => ({ ...s, results, loading: false }));
  }

  open(): void {
    this._state.update((s) => ({ ...s, open: true }));
  }

  close(): void {
    this._state.update((s) => ({ ...s, open: false, query: '', results: [] }));
  }

  navigate(result: SearchResult): void {
    this.router.navigateByUrl(result.route);
    this.close();
  }

  clear(): void {
    this._state.update((s) => ({ ...s, query: '', results: [] }));
  }
}
