export const APP_NAME = 'MaterialForge';
export const APP_TAGLINE = 'Build Once. Reuse Everywhere.';
export const APP_VERSION = '1.0.0';

export const THEME_KEY = 'material-forge-theme';
export const SIDEBAR_STATE_KEY = 'material-forge-sidebar';

export const DEBOUNCE_TIME = 300;
export const MIN_SEARCH_LENGTH = 2;

export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
} as const;

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100] as const;

export const SNACKBAR_DURATION = {
  short: 2500,
  medium: 4000,
  long: 6000,
  sticky: 0,
} as const;

export const DIALOG_SIZES = {
  sm: '400px',
  md: '600px',
  lg: '800px',
  xl: '1000px',
  fullScreen: '100vw',
} as const;

export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
export const ACCEPTED_DOC_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];
