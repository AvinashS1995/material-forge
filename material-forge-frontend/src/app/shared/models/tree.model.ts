export interface TreeNode<T = unknown> {
  id: string | number;
  label: string;
  icon?: string;
  children?: TreeNode<T>[];
  data?: T;
  disabled?: boolean;
  expandable?: boolean;
  level?: number;
  parent?: string | number | null;
  checked?: boolean;
  indeterminate?: boolean;
}

export interface FlatTreeNode<T = unknown> {
  id: string | number;
  label: string;
  icon?: string;
  level: number;
  expandable: boolean;
  data?: T;
  disabled?: boolean;
  parent?: string | number | null;
  checked?: boolean;
  indeterminate?: boolean;
}

export interface TreeConfig {
  showCheckbox?: boolean;
  showIcons?: boolean;
  searchable?: boolean;
  cascadeSelect?: boolean;
  expandAll?: boolean;
  emptyMessage?: string;
}
