export interface ComponentDoc {
  id: string;
  name: string;
  category: ComponentCategory;
  description: string;
  icon: string;
  route: string;
  tags: string[];
  isNew?: boolean;
  inputs?: ComponentInput[];
  outputs?: ComponentOutput[];
  usageExample?: string;
  features?: string[];
}

export type ComponentCategory =
  | 'form-controls'
  | 'data'
  | 'navigation'
  | 'surface'
  | 'feedback'
  | 'utilities';

export interface ComponentInput {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

export interface ComponentOutput {
  name: string;
  type: string;
  description: string;
}

export interface ComponentStats {
  total: number;
  formControls: number;
  data: number;
  navigation: number;
  surface: number;
  feedback: number;
  utilities: number;
}
