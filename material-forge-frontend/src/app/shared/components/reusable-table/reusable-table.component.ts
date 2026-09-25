import {
  Component, Input, Output, EventEmitter, OnChanges, SimpleChanges,
  ChangeDetectionStrategy, signal, computed, ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { SelectionModel } from '@angular/cdk/collections';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {
  TableColumn, TableAction, TableConfig, TableState,
  ActionEvent, SortDirection,
} from '../../models/table.model';
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '../../../core/constants/app.constants';
import { EmptyStateComponent } from '../empty-state/empty-state.component';

@Component({
  selector: 'app-reusable-table',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatTableModule, MatSortModule, MatPaginatorModule,
    MatCheckboxModule, MatInputModule, MatFormFieldModule,
    MatIconModule, MatButtonModule, MatMenuModule,
    MatTooltipModule, MatProgressBarModule, MatChipsModule, MatBadgeModule,
    EmptyStateComponent,
  ],
  templateUrl: './reusable-table.component.html',
  styleUrl: './reusable-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// Loosen the generic constraint so typed arrays (Employee[], etc.) are accepted
export class ReusableTableComponent<T = Record<string, unknown>>
  implements OnChanges {

  @Input() data: T[] = [];
  @Input() columns: TableColumn<T>[] = [];
  @Input() actions: TableAction<T>[] = [];
  @Input() config: TableConfig = {};
  @Input() loading = false;
  @Input() totalItems = 0;
  @Input() pageSize = DEFAULT_PAGE_SIZE;
  @Input() serverSide = false;

  // Feature toggles (shorthand inputs)
  @Input() showPagination = true;
  @Input() showSearch = true;
  @Input() showSort = true;
  @Input() showSelection = false;
  @Input() showColumnToggle = false;
  @Input() showExport = false;
  @Input() stickyHeader = true;
  @Input() striped = false;
  @Input() emptyMessage = 'No data to display';
  @Input() searchPlaceholder = 'Search...';

  @Output() rowClick = new EventEmitter<T>();
  @Output() actionClick = new EventEmitter<ActionEvent<T>>();
  @Output() selectionChange = new EventEmitter<T[]>();
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() sortChange = new EventEmitter<Sort>();
  @Output() searchChange = new EventEmitter<string>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly searchControl = new FormControl('');
  readonly selection = new SelectionModel<T>(true, []);

  private readonly _state = signal<TableState>({
    page: 0,
    pageSize: DEFAULT_PAGE_SIZE,
    sortColumn: '',
    sortDirection: '',
    search: '',
    filters: {},
    selectedRows: [],
    totalItems: 0,
  });

  readonly state = this._state.asReadonly();

  private readonly _filteredData = signal<T[]>([]);
  private readonly _pagedData = signal<T[]>([]);

  readonly displayedData = computed(() => this._pagedData());

  readonly displayedColumns = computed(() => {
    const cols: string[] = [];
    if (this.showSelection) cols.push('_select');
    cols.push(...this.visibleColumns().map((c) => c.key));
    if (this.actions.length > 0) cols.push('_actions');
    return cols;
  });

  readonly visibleColumns = signal<TableColumn<T>[]>([]);
  readonly pageSizeOptions = [...PAGE_SIZE_OPTIONS];

  readonly isAllSelected = computed(() => {
    const numSelected = this.selection.selected.length;
    const numRows = this._pagedData().length;
    return numSelected === numRows && numRows > 0;
  });

  readonly hasData = computed(() => this._pagedData().length > 0);
  readonly selectedCount = computed(() => this.selection.selected.length);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']) {
      this.visibleColumns.set([...this.columns.filter((c) => c.visible !== false)]);
    }
    if (changes['data'] || changes['columns']) {
      this._filteredData.set([...this.data]);
      this.applyPaging();
    }
    if (changes['pageSize']) {
      this._state.update((s) => ({ ...s, pageSize: this.pageSize }));
    }

    // Subscribe to search once
    if (changes['showSearch']) {
      this.searchControl.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
      ).subscribe((query) => {
        this.applySearch(query ?? '');
      });
    }
  }

  private applySearch(query: string): void {
    this._state.update((s) => ({ ...s, search: query, page: 0 }));

    if (!query.trim()) {
      this._filteredData.set([...this.data]);
    } else {
      const q = query.toLowerCase();
      this._filteredData.set(
        this.data.filter((row) =>
          this.visibleColumns().some((col) => {
            const r = row as unknown as Record<string, unknown>;
            const val = r[col.key];
            return val != null && String(val).toLowerCase().includes(q);
          })
        )
      );
    }
    this.applyPaging();
    this.searchChange.emit(query);
  }

  private applyPaging(): void {
    const { page, pageSize } = this._state();
    const start = page * pageSize;
    const end = start + pageSize;
    const source = this._filteredData();
    this._pagedData.set(source.slice(start, end));
    this._state.update((s) => ({ ...s, totalItems: source.length }));
  }

  onPageChange(event: PageEvent): void {
    this._state.update((s) => ({ ...s, page: event.pageIndex, pageSize: event.pageSize }));
    this.applyPaging();
    this.pageChange.emit(event);
  }

  onSortChange(sort: Sort): void {
    this._state.update((s) => ({
      ...s,
      sortColumn: sort.active,
      sortDirection: sort.direction as SortDirection,
      page: 0,
    }));

    if (!sort.active || sort.direction === '') {
      this._filteredData.set([...this.data]);
    } else {
      const sorted = [...this._filteredData()].sort((a, b) => {
        const ar = a as unknown as Record<string, unknown>;
        const br = b as unknown as Record<string, unknown>;
        const aStr = String(ar[sort.active] ?? '');
        const bStr = String(br[sort.active] ?? '');
        const cmp = aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
        return sort.direction === 'asc' ? cmp : -cmp;
      });
      this._filteredData.set(sorted);
    }
    this.applyPaging();
    this.sortChange.emit(sort);
  }

  onRowClick(row: T): void { this.rowClick.emit(row); }

  onActionClick(action: TableAction<T>, row: T, index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.actionClick.emit({ actionId: action.id, row, index });
  }

  isActionDisabled(action: TableAction<T>, row: T): boolean {
    if (typeof action.disabled === 'function') return action.disabled(row);
    return action.disabled ?? false;
  }

  isActionVisible(action: TableAction<T>, row: T): boolean {
    if (typeof action.visible === 'function') return action.visible(row);
    return action.visible ?? true;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this._pagedData().forEach((row) => this.selection.select(row));
    }
    this.selectionChange.emit(this.selection.selected);
  }

  toggleRow(row: T): void {
    this.selection.toggle(row);
    this.selectionChange.emit(this.selection.selected);
  }

  isSelected(row: T): boolean { return this.selection.isSelected(row); }

  toggleColumnVisibility(col: TableColumn<T>): void {
    col.visible = !col.visible;
    this.visibleColumns.set([...this.columns.filter((c) => c.visible !== false)]);
  }

  getCellValue(col: TableColumn<T>, row: T): unknown {
    return (row as unknown as Record<string, unknown>)[col.key];
  }

  private asRecord(row: T): Record<string, unknown> {
    return row as unknown as Record<string, unknown>;
  }

  formatCellValue(col: TableColumn<T>, row: T): string {
    const r = this.asRecord(row);
    const value = r[col.key];
    if (col.format) return col.format(value, row);
    if (value == null) return '—';
    if (col.type === 'date' && value) {
      return new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
        .format(new Date(String(value)));
    }
    if (col.type === 'currency') {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })
        .format(Number(value));
    }
    if (col.type === 'boolean') return value ? 'Yes' : 'No';
    return String(value);
  }

  getBadgeColor(col: TableColumn<T>, row: T): string {
    const value = String(this.asRecord(row)[col.key] ?? '');
    return col.badgeConfig?.colorMap?.[value] ?? col.badgeConfig?.defaultColor ?? 'default';
  }

  trackById(_: number, item: T): unknown {
    return (item as unknown as Record<string, unknown>)['id'] ?? _;
  }

  isFn(val: unknown): val is (row: T) => string {
    return typeof val === 'function';
  }
}
