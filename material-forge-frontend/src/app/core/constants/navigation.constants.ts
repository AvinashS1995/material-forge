import { NavCategory } from '../models/navigation.model';

export const NAV_CATEGORIES: NavCategory[] = [
  {
    id: 'main',
    label: 'Main',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'dashboard',
        route: '/dashboard',
        description: 'Overview and statistics',
      },
    ],
  },
  {
    id: 'form-controls',
    label: 'Form Controls',
    items: [
      { id: 'input', label: 'Input', icon: 'text_fields', route: '/components/input', description: 'Text input field', isNew: false },
      { id: 'select', label: 'Select', icon: 'arrow_drop_down_circle', route: '/components/select', description: 'Dropdown selection' },
      { id: 'autocomplete', label: 'Autocomplete', icon: 'search', route: '/components/autocomplete', description: 'Search with suggestions' },
      { id: 'checkbox', label: 'Checkbox', icon: 'check_box', route: '/components/checkbox', description: 'Boolean selection' },
      { id: 'radio', label: 'Radio', icon: 'radio_button_checked', route: '/components/radio', description: 'Single selection from set' },
      { id: 'toggle', label: 'Toggle', icon: 'toggle_on', route: '/components/toggle', description: 'Slide toggle switch' },
      { id: 'slider', label: 'Slider', icon: 'tune', route: '/components/slider', description: 'Range slider input' },
      { id: 'datepicker', label: 'Datepicker', icon: 'date_range', route: '/components/datepicker', description: 'Date & date range selection' },
      { id: 'chips', label: 'Chips', icon: 'label', route: '/components/chips', description: 'Tag/chip input', isNew: true },
      { id: 'file-upload', label: 'File Upload', icon: 'upload_file', route: '/components/file-upload', description: 'File upload with drag & drop', isNew: true },
    ],
  },
  {
    id: 'data',
    label: 'Data',
    items: [
      { id: 'table', label: 'Table', icon: 'table_chart', route: '/components/table', description: 'Data table with sorting & pagination', isNew: true },
      { id: 'list', label: 'List', icon: 'list', route: '/components/list', description: 'Material list component' },
      { id: 'tree', label: 'Tree', icon: 'account_tree', route: '/components/tree', description: 'Hierarchical tree view', isNew: true },
    ],
  },
  {
    id: 'navigation',
    label: 'Navigation',
    items: [
      { id: 'menu', label: 'Menu', icon: 'menu', route: '/components/menu', description: 'Dropdown menu' },
      { id: 'tabs', label: 'Tabs', icon: 'tab', route: '/components/tabs', description: 'Tabbed navigation' },
      { id: 'stepper', label: 'Stepper', icon: 'linear_scale', route: '/components/stepper', description: 'Multi-step wizard', isNew: true },
      { id: 'expansion', label: 'Expansion Panel', icon: 'expand_more', route: '/components/expansion', description: 'Collapsible panels' },
      { id: 'breadcrumb', label: 'Breadcrumb', icon: 'navigate_next', route: '/components/breadcrumb', description: 'Navigation breadcrumbs' },
    ],
  },
  {
    id: 'surface',
    label: 'Surface',
    items: [
      { id: 'card', label: 'Card', icon: 'crop_square', route: '/components/card', description: 'Material card container' },
      { id: 'dialog', label: 'Dialog', icon: 'open_in_full', route: '/components/dialog', description: 'Modal dialogs', isNew: true },
      { id: 'bottom-sheet', label: 'Bottom Sheet', icon: 'expand_less', route: '/components/bottom-sheet', description: 'Bottom sheet panel' },
    ],
  },
  {
    id: 'feedback',
    label: 'Feedback',
    items: [
      { id: 'snackbar', label: 'Snackbar', icon: 'notifications', route: '/components/snackbar', description: 'Toast notifications' },
      { id: 'tooltip', label: 'Tooltip', icon: 'help_outline', route: '/components/tooltip', description: 'Hover tooltips' },
      { id: 'progress', label: 'Progress', icon: 'downloading', route: '/components/progress', description: 'Progress bar & spinner' },
      { id: 'empty-state', label: 'Empty State', icon: 'inbox', route: '/components/empty-state', description: 'No data placeholder' },
    ],
  },
  {
    id: 'utilities',
    label: 'Utilities',
    items: [
      { id: 'icon', label: 'Icon', icon: 'star', route: '/components/icon', description: 'Material icons' },
      { id: 'badge', label: 'Badge', icon: 'fiber_manual_record', route: '/components/badge', description: 'Notification badges' },
      { id: 'divider', label: 'Divider', icon: 'horizontal_rule', route: '/components/divider', description: 'Visual separator' },
      { id: 'skeleton', label: 'Skeleton', icon: 'crop_landscape', route: '/components/skeleton', description: 'Loading skeleton', isNew: true },
    ],
  },
  {
    id: 'examples',
    label: 'Examples',
    items: [
      { id: 'employee', label: 'Employee Mgmt', icon: 'people', route: '/examples/employee', description: 'Full employee management' },
      { id: 'patient', label: 'Patient Tracking', icon: 'local_hospital', route: '/examples/patient', description: 'Patient tracking system' },
      { id: 'sales', label: 'Sales Management', icon: 'point_of_sale', route: '/examples/sales', description: 'Sales & orders management' },
    ],
  },
];

export const COMPONENT_SEARCH_INDEX = NAV_CATEGORIES.flatMap((cat) =>
  cat.items.map((item) => ({
    ...item,
    category: cat.label,
  }))
);
