import type { Recipe, UserProgress } from '../types';
import { isRecipeCompleted } from './storage';

export async function loadRecipes(): Promise<Recipe[]> {
  const response = await fetch('./data/recipes.json');
  if (!response.ok) throw new Error('Impossible de charger les recettes.');
  const recipes = (await response.json()) as Recipe[];
  return recipes.sort((a, b) => a.title.localeCompare(b.title, 'fr'));
}

export function findRecipe(recipes: Recipe[], id: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.id === id);
}

export function getRecommendedRecipe(recipes: Recipe[], progress: UserProgress): Recipe | undefined {
  if (progress.activeWeeklyRecipeId) {
    const active = findRecipe(recipes, progress.activeWeeklyRecipeId);
    if (active) return active;
  }

  return recipes.find((recipe) => !isRecipeCompleted(progress, recipe.id) && recipe.level <= 2) ?? recipes[0];
}

export function formatBudget(budget: string): string {
  if (budget === 'faible') return '€';
  if (budget === 'moyen') return '€€';
  return '€€€';
}

export function skillLabel(skill: string): string {
  return skill
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
