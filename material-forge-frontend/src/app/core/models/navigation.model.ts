export interface NavItem {
  id: string;
  label: string;
  icon?: string;
  route?: string;
  children?: NavItem[];
  badge?: string | number;
  badgeColor?: 'primary' | 'accent' | 'warn';
  disabled?: boolean;
  category?: string;
  description?: string;
  isNew?: boolean;
}

export interface NavCategory {
  id: string;
  label: string;
  icon?: string;
  items: NavItem[];
  expanded?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  route?: string;
  icon?: string;
}
