export interface SearchResult {
  id: string;
  label: string;
  description?: string;
  category: string;
  icon?: string;
  route: string;
  tags?: string[];
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  loading: boolean;
  open: boolean;
}
