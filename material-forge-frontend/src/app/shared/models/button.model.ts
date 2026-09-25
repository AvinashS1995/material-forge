export type ButtonVariant = 'flat' | 'raised' | 'stroked' | 'basic' | 'icon' | 'fab' | 'mini-fab';
export type ButtonColor = 'primary' | 'accent' | 'warn' | undefined;
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonType = 'button' | 'submit' | 'reset';

export interface ButtonConfig {
  label?: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
  loading?: boolean;
  tooltip?: string;
  ariaLabel?: string;
  fullWidth?: boolean;
}
