<script setup lang="ts">
import { ref, watch } from 'vue';

defineProps<{
  categories: string[];
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:filters', filters: any): void;
  (e: 'update:source', source: 'api' | 'local'): void;
}>();

const source = ref<'api' | 'local'>('api');
const selectedCategory = ref('');
const selectedDifficulty = ref('');
const selectedTime = ref('');

const difficulties = ['Easy', 'Medium', 'Hard'];
const times = [
  { label: 'Up to 15 min', value: 15 },
  { label: 'Up to 30 min', value: 30 },
  { label: 'Up to 60 min', value: 60 },
  { label: 'More than 60 min', value: 120 } // Using 120 as a marker for > 60
];

watch([source, selectedCategory, selectedDifficulty, selectedTime], () => {
  emit('update:source', source.value);
  emit('update:filters', {
    category: selectedCategory.value,
    difficulty: selectedDifficulty.value,
    time: selectedTime.value
  });
});
</script>

<template>
  <div class="filters-panel">
    <div class="filter-group">
      <label>Source</label>
      <div class="toggle-group">
        <button 
          :class="{ active: source === 'api' }" 
          @click="source = 'api'"
        >
          API
        </button>
        <button 
          :class="{ active: source === 'local' }" 
          @click="source = 'local'"
        >
          My List
        </button>
      </div>
    </div>

    <div class="filter-group">
      <label>Category / Side Dish</label>
      <select v-model="selectedCategory" :disabled="loading">
        <option value="">Any</option>
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
    </div>

    <div class="filter-group">
      <label>Difficulty</label>
      <select v-model="selectedDifficulty" :disabled="source === 'api'">
        <option value="">Any</option>
        <option v-for="diff in difficulties" :key="diff" :value="diff">
          {{ diff }}
        </option>
      </select>
      <small v-if="source === 'api'" class="hint">Not available for API</small>
    </div>

    <div class="filter-group">
      <label>Time</label>
      <select v-model="selectedTime" :disabled="source === 'api'">
        <option value="">Any</option>
        <option v-for="t in times" :key="t.value" :value="t.value">
          {{ t.label }}
        </option>
      </select>
      <small v-if="source === 'api'" class="hint">Not available for API</small>
    </div>
  </div>
</template>

<style scoped>
.filters-panel {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-text);
}

select {
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: white;
  font-size: 1rem;
  width: 100%;
}

select:disabled {
  background: #e9ecef;
  cursor: not-allowed;
}

.toggle-group {
  display: flex;
  background: #e2e8f0;
  padding: 4px;
  border-radius: 8px;
}

.toggle-group button {
  flex: 1;
  padding: 0.5rem;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s;
}

.toggle-group button.active {
  background: white;
  color: var(--color-primary);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.hint {
  font-size: 0.8rem;
  color: #718096;
}
</style>
