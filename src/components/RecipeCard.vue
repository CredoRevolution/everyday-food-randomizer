<script setup lang="ts">
import type { Recipe } from '../types/Recipe';

defineProps<{
  recipe: Recipe;
}>();

const emit = defineEmits<{
  (e: 'retry'): void;
}>();
</script>

<template>
  <div class="recipe-card">
    <div class="image-container" v-if="recipe.image">
      <img :src="recipe.image" :alt="recipe.name" />
      <div class="badges">
        <span class="badge category">{{ recipe.category }}</span>
        <span class="badge area" v-if="recipe.area">{{ recipe.area }}</span>
      </div>
    </div>

    <div class="content">
      <h2>{{ recipe.name }}</h2>
      
      <div class="meta">
        <div class="meta-item" v-if="recipe.difficulty">
          <span class="label">Difficulty:</span>
          <span class="value">{{ recipe.difficulty }}</span>
        </div>
        <div class="meta-item" v-if="recipe.time">
          <span class="label">Time:</span>
          <span class="value">{{ recipe.time }} min</span>
        </div>
      </div>

      <div class="section">
        <h3>Ingredients</h3>
        <ul class="ingredients-list">
          <li v-for="(ing, index) in recipe.ingredients" :key="index">
            <span class="measure">{{ ing.measure }}</span>
            <span class="name">{{ ing.name }}</span>
          </li>
        </ul>
      </div>

      <div class="section" v-if="recipe.instructions">
        <h3>Instructions</h3>
        <p class="instructions">{{ recipe.instructions }}</p>
      </div>

      <div class="actions">
        <a v-if="recipe.youtube" :href="recipe.youtube" target="_blank" class="btn-secondary">
          Watch Video
        </a>
        <button class="btn-primary" @click="emit('retry')">
          Choose Another
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recipe-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.image-container {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.badges {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  gap: 0.5rem;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-text);
  backdrop-filter: blur(4px);
}

.content {
  padding: 1.5rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.meta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.meta-item {
  display: flex;
  flex-direction: column;
}

.meta-item .label {
  font-size: 0.8rem;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.meta-item .value {
  font-weight: 600;
}

.section {
  margin-bottom: 1.5rem;
}

h3 {
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  color: var(--color-text);
}

.ingredients-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.5rem;
}

.ingredients-list li {
  display: flex;
  gap: 0.5rem;
  font-size: 0.95rem;
}

.measure {
  font-weight: 600;
  color: var(--color-primary);
}

.instructions {
  white-space: pre-line;
  color: #4a5568;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-primary, .btn-secondary {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background: var(--color-primary-hover);
}

.btn-secondary {
  background: #edf2f7;
  color: var(--color-text);
}

.btn-secondary:hover {
  background: #e2e8f0;
}

@media (max-width: 640px) {
  .actions {
    flex-direction: column;
  }
}
</style>
