export interface CardConfig {
  title?: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  elevation?: number;
  outlined?: boolean;
  clickable?: boolean;
  loading?: boolean;
  actions?: CardAction[];
  headerIcon?: string;
  headerIconColor?: string;
}

export interface CardAction {
  id: string;
  label: string;
  icon?: string;
  color?: 'primary' | 'accent' | 'warn';
  disabled?: boolean;
}

export interface StatCard {
  id: string;
  title: string;
  value: number | string;
  subtitle?: string;
  icon: string;
  iconColor?: string;
  iconBg?: string;
  trend?: number;
  trendLabel?: string;
  route?: string;
}
