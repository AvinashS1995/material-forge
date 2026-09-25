export type ColumnType = 'text' | 'number' | 'date' | 'boolean' | 'badge' | 'avatar' | 'actions' | 'template' | 'currency' | 'email' | 'phone';
export type SortDirection = 'asc' | 'desc' | '';

export interface TableColumn<T = unknown> {  key: string;
  header: string;
  type?: ColumnType;
  sortable?: boolean;
  filterable?: boolean;
  sticky?: boolean;
  stickyEnd?: boolean;
  visible?: boolean;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  align?: 'left' | 'center' | 'right';
  format?: (value: unknown, row: T) => string;
  badgeConfig?: BadgeColumnConfig;
  cellClass?: string | ((row: T) => string);
  headerClass?: string;
}

export interface BadgeColumnConfig {
  colorMap?: Record<string, string>;
  defaultColor?: string;
}

export interface TableAction<T = unknown> {
  id: string;
  label: string;
  icon?: string;
  color?: 'primary' | 'accent' | 'warn';
  tooltip?: string;
  disabled?: ((row: T) => boolean) | boolean;
  visible?: ((row: T) => boolean) | boolean;
  confirmMessage?: string;
}

export interface TableConfig {
  columns?: TableColumn[];
  pageSize?: number;
  pageSizeOptions?: number[];
  showPagination?: boolean;
  showSearch?: boolean;
  showSort?: boolean;
  showSelection?: boolean;
  showColumnToggle?: boolean;
  showExport?: boolean;
  stickyHeader?: boolean;
  striped?: boolean;
  hover?: boolean;
  dense?: boolean;
  emptyMessage?: string;
  loadingMessage?: string;
  serverSide?: boolean;
  searchPlaceholder?: string;
}

export interface TableState {
  page: number;
  pageSize: number;
  sortColumn: string;
  sortDirection: SortDirection;
  search: string;
  filters: Record<string, unknown>;
  selectedRows: unknown[];
  totalItems: number;
}

export interface TableEvent<T = unknown> {
  type: 'sort' | 'page' | 'search' | 'filter' | 'select' | 'action';
  data: T;
  state: TableState;
}

export interface ActionEvent<T = unknown> {
  actionId: string;
  row: T;
  index: number;
}

export interface PageEvent {
  pageIndex: number;
  pageSize: number;
  length: number;
}
