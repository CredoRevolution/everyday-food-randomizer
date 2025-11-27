export interface Ingredient {
  name: string;
  measure: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: string; // Side dish type or Category
  area?: string; // Cuisine
  instructions?: string;
  image?: string;
  tags?: string[];
  youtube?: string;
  ingredients: Ingredient[];
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  time?: number; // Minutes
}
