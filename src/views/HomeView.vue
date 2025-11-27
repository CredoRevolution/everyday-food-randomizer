<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FiltersPanel from '../components/FiltersPanel.vue';
import RecipeCard from '../components/RecipeCard.vue';
import { recipesApi } from '../api/recipesApi';
import { localRecipes } from '../data/localRecipes';
import type { Recipe } from '../types/Recipe';

const loading = ref(false);
const error = ref('');
const currentSource = ref<'api' | 'local'>('api');
const categories = ref<string[]>([]);
const selectedRecipe = ref<Recipe | null>(null);

const filters = ref({
  category: '',
  difficulty: '',
  time: ''
});

// Load initial data
onMounted(async () => {
  loading.value = true;
  try {
    // Fetch categories for API
    const apiCategories = await recipesApi.getCategories();
    // Merge with local categories if needed, or just use API ones for the dropdown
    // For simplicity, let's use API categories + unique local ones
    const localCategories = Array.from(new Set(localRecipes.map(r => r.category)));
    categories.value = Array.from(new Set([...apiCategories, ...localCategories])).sort();
  } catch (e) {
    console.error('Failed to load categories', e);
  } finally {
    loading.value = false;
  }
});

const handleSourceChange = (source: 'api' | 'local') => {
  currentSource.value = source;
  selectedRecipe.value = null;
  error.value = '';
};

const handleFiltersChange = (newFilters: any) => {
  filters.value = newFilters;
  // Reset selection when filters change? Maybe not, let user decide when to pick.
};

const pickRandomRecipe = async () => {
  loading.value = true;
  error.value = '';
  selectedRecipe.value = null;

  try {
    if (currentSource.value === 'local') {
      pickLocalRecipe();
    } else {
      await pickApiRecipe();
    }
  } catch (e) {
    error.value = 'Failed to find a recipe. Please try again.';
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const pickLocalRecipe = () => {
  let filtered = localRecipes;

  if (filters.value.category) {
    filtered = filtered.filter(r => r.category === filters.value.category);
  }
  if (filters.value.difficulty) {
    filtered = filtered.filter(r => r.difficulty === filters.value.difficulty);
  }
  if (filters.value.time) {
    filtered = filtered.filter(r => (r.time || 0) <= Number(filters.value.time));
  }

  if (filtered.length === 0) {
    error.value = 'No recipes found with these filters in your list.';
    return;
  }

  const randomIndex = Math.floor(Math.random() * filtered.length);
  selectedRecipe.value = filtered[randomIndex]!;
};

const pickApiRecipe = async () => {
  // API strategy:
  // 1. If category is selected, fetch list by category -> pick random -> fetch details
  // 2. If no category, use random.php (ignores other filters)
  
  if (filters.value.category) {
    const list = await recipesApi.getRecipesByCategory(filters.value.category);
    if (list.length === 0) {
      error.value = 'No recipes found for this category.';
      return;
    }
    const randomIndex = Math.floor(Math.random() * list.length);
    const partialRecipe = list[randomIndex];
    
    if (!partialRecipe) {
        error.value = 'Failed to pick a recipe.';
        return;
    }

    // Fetch full details
    const fullRecipe = await recipesApi.getRecipeById(partialRecipe.id);
    if (fullRecipe) {
      selectedRecipe.value = fullRecipe;
    } else {
      error.value = 'Failed to load recipe details.';
    }
  } else {
    const randomRecipe = await recipesApi.getRandomRecipe();
    if (randomRecipe) {
      selectedRecipe.value = randomRecipe;
    } else {
      error.value = 'Failed to fetch a random recipe.';
    }
  }
};
</script>

<template>
  <main class="home-view">
    <header>
      <h1>What to Eat?</h1>
      <p>Let us decide your next meal.</p>
    </header>

    <div class="layout">
      <aside class="sidebar">
        <FiltersPanel 
          :categories="categories"
          :loading="loading"
          @update:filters="handleFiltersChange"
          @update:source="handleSourceChange"
        />
        
        <button 
          class="btn-generate"
          :disabled="loading"
          @click="pickRandomRecipe"
        >
          {{ loading ? 'Finding Food...' : 'Pick a Meal' }}
        </button>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>
      </aside>

      <section class="result-area">
        <div v-if="!selectedRecipe && !loading && !error" class="placeholder">
          <div class="placeholder-content">
            <span class="icon">🍽️</span>
            <h3>Ready to choose?</h3>
            <p>Select your preferences and click the button.</p>
          </div>
        </div>

        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Searching the kitchen...</p>
        </div>

        <RecipeCard 
          v-if="selectedRecipe" 
          :recipe="selectedRecipe" 
          @retry="pickRandomRecipe"
        />
      </section>
    </div>
  </main>
</template>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
}

header {
  text-align: center;
  margin-bottom: 3rem;
}

header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, #2c3e50 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

header p {
  color: #718096;
  font-size: 1.1rem;
}

.layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  align-items: start;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: sticky;
  top: 2rem;
}

.btn-generate {
  background: var(--color-primary);
  color: white;
  padding: 1rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  width: 100%;
  transition: transform 0.1s, box-shadow 0.2s;
  box-shadow: 0 4px 6px rgba(66, 185, 131, 0.2);
}

.btn-generate:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(66, 185, 131, 0.3);
  background: var(--color-primary-hover);
}

.btn-generate:active:not(:disabled) {
  transform: translateY(0);
}

.btn-generate:disabled {
  opacity: 0.7;
  cursor: wait;
}

.error-message {
  padding: 1rem;
  background: #fff5f5;
  color: var(--color-error);
  border-radius: 8px;
  font-size: 0.9rem;
  border: 1px solid #feb2b2;
}

.result-area {
  min-height: 400px;
}

.placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 16px;
  border: 2px dashed #e2e8f0;
  min-height: 400px;
}

.placeholder-content {
  text-align: center;
  color: #a0aec0;
}

.placeholder .icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #718096;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
  }
}
</style>
