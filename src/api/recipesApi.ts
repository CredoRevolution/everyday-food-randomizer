import type { Recipe } from '../types/Recipe';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

interface MealDBMeal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  [key: string]: string | null; // For dynamic ingredients/measures
}

export const recipesApi = {
  async getRandomRecipe(): Promise<Recipe | null> {
    try {
      const response = await fetch(`${BASE_URL}/random.php`);
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        return transformMeal(data.meals[0]);
      }
      return null;
    } catch (error) {
      console.error('Error fetching random recipe:', error);
      return null;
    }
  },

  async getRecipesByCategory(category: string): Promise<Recipe[]> {
    try {
      const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
      const data = await response.json();
      if (data.meals) {
        // The filter endpoint only returns partial data (id, name, thumb).
        // We might need to fetch details for the selected one later, 
        // but for the list we can return partial recipes.
        // However, the app logic is "Filter -> Get List -> Pick Random -> Show Details".
        // So we can return the list of partials, and then fetch details for the chosen one.
        // But the Recipe interface requires more fields. 
        // Let's return partials and handle detail fetching separately or just map what we have.
        return data.meals.map((meal: any) => ({
          id: meal.idMeal,
          name: meal.strMeal,
          category: category,
          image: meal.strMealThumb,
          ingredients: [], // Missing in filter response
          difficulty: 'Medium', // Default
          time: 30 // Default
        }));
      }
      return [];
    } catch (error) {
      console.error(`Error fetching recipes for category ${category}:`, error);
      return [];
    }
  },

  async getRecipeById(id: string): Promise<Recipe | null> {
    try {
      const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        return transformMeal(data.meals[0]);
      }
      return null;
    } catch (error) {
      console.error(`Error fetching recipe by id ${id}:`, error);
      return null;
    }
  },
  
  async getCategories(): Promise<string[]> {
      try {
          const response = await fetch(`${BASE_URL}/list.php?c=list`);
          const data = await response.json();
          if (data.meals) {
              return data.meals.map((c: any) => c.strCategory);
          }
          return [];
      } catch (error) {
          console.error('Error fetching categories:', error);
          return [];
      }
  }
};

function transformMeal(meal: MealDBMeal): Recipe {
  const ingredients: { name: string; measure: string }[] = [];
  
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({
        name: ingredient,
        measure: measure || ''
      });
    }
  }

  return {
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    image: meal.strMealThumb,
    tags: meal.strTags ? meal.strTags.split(',') : [],
    youtube: meal.strYoutube,
    ingredients,
    difficulty: 'Medium', // API doesn't provide this, defaulting
    time: 30 // API doesn't provide this, defaulting
  };
}
