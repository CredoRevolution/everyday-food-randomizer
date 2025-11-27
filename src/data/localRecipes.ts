import type { Recipe } from '../types/Recipe';

export const localRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Spaghetti Carbonara',
    category: 'Pasta',
    area: 'Italian',
    instructions: 'Boil pasta. Fry pancetta. Mix eggs and cheese. Combine all.',
    image: 'https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg', // Placeholder or real URL if available
    ingredients: [
      { name: 'Spaghetti', measure: '400g' },
      { name: 'Pancetta', measure: '150g' },
      { name: 'Eggs', measure: '4' },
      { name: 'Parmesan', measure: '100g' }
    ],
    difficulty: 'Medium',
    time: 20
  },
  {
    id: '2',
    name: 'Grilled Chicken Salad',
    category: 'Salad',
    area: 'American',
    instructions: 'Grill chicken. Chop veggies. Mix dressing. Toss salad.',
    ingredients: [
      { name: 'Chicken Breast', measure: '2' },
      { name: 'Lettuce', measure: '1 head' },
      { name: 'Tomatoes', measure: '2' },
      { name: 'Cucumber', measure: '1' }
    ],
    difficulty: 'Easy',
    time: 15
  },
  {
    id: '3',
    name: 'Vegetable Stir Fry',
    category: 'Vegetarian',
    area: 'Asian',
    instructions: 'Chop veggies. Stir fry with sauce. Serve with rice.',
    ingredients: [
      { name: 'Broccoli', measure: '1 head' },
      { name: 'Carrots', measure: '2' },
      { name: 'Soy Sauce', measure: '2 tbsp' },
      { name: 'Rice', measure: '1 cup' }
    ],
    difficulty: 'Easy',
    time: 25
  },
  {
    id: '4',
    name: 'Beef Stew',
    category: 'Meat',
    area: 'French',
    instructions: 'Brown meat. Add veggies and broth. Simmer for hours.',
    ingredients: [
      { name: 'Beef Chuck', measure: '500g' },
      { name: 'Potatoes', measure: '4' },
      { name: 'Carrots', measure: '3' },
      { name: 'Beef Broth', measure: '1L' }
    ],
    difficulty: 'Hard',
    time: 120
  },
  {
    id: '5',
    name: 'Fish and Chips',
    category: 'Seafood',
    area: 'British',
    instructions: 'Batter fish. Fry fish and chips. Serve with tartar sauce.',
    ingredients: [
      { name: 'Cod Fillet', measure: '2' },
      { name: 'Potatoes', measure: '4' },
      { name: 'Flour', measure: '1 cup' },
      { name: 'Beer', measure: '1 cup' }
    ],
    difficulty: 'Medium',
    time: 45
  }
];
