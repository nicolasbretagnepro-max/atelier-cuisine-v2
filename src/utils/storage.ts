import type { Recipe, UserProgress } from '../types';

const STORAGE_KEY = 'atelier-cuisine-progress-v1';

const defaultProgress: UserProgress = {
  version: 1,
  completedRecipes: [],
  favoriteRecipeIds: [],
  activeWeeklyRecipeId: null,
  skillProgress: {},
  lastUpdatedAt: new Date().toISOString()
};

export function getProgress(): UserProgress {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: UserProgress): void {
  const next = { ...progress, lastUpdatedAt: new Date().toISOString() };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function isRecipeCompleted(progress: UserProgress, recipeId: string): boolean {
  return progress.completedRecipes.some((item) => item.recipeId === recipeId);
}

export function isFavorite(progress: UserProgress, recipeId: string): boolean {
  return progress.favoriteRecipeIds.includes(recipeId);
}

export function toggleFavorite(progress: UserProgress, recipeId: string): UserProgress {
  const exists = isFavorite(progress, recipeId);
  return {
    ...progress,
    favoriteRecipeIds: exists
      ? progress.favoriteRecipeIds.filter((id) => id !== recipeId)
      : [...progress.favoriteRecipeIds, recipeId]
  };
}

export function markRecipeCompleted(progress: UserProgress, recipe: Recipe, notes = ''): UserProgress {
  const now = new Date().toISOString();
  const existing = progress.completedRecipes.filter((item) => item.recipeId !== recipe.id);
  const skillProgress = { ...progress.skillProgress };

  for (const skill of [recipe.mainSkill, ...recipe.skills]) {
    const current = skillProgress[skill] ?? { level: 0, practiceCount: 0, lastPracticedAt: now };
    const practiceCount = current.practiceCount + 1;
    skillProgress[skill] = {
      level: Math.min(5, Math.max(current.level, Math.ceil(practiceCount / 2))),
      practiceCount,
      lastPracticedAt: now
    };
  }

  return {
    ...progress,
    completedRecipes: [
      ...existing,
      {
        recipeId: recipe.id,
        completedAt: now,
        notes,
        wouldCookAgain: true
      }
    ],
    skillProgress
  };
}

export function setWeeklyRecipe(progress: UserProgress, recipeId: string): UserProgress {
  return { ...progress, activeWeeklyRecipeId: recipeId };
}

export function resetProgress(): UserProgress {
  saveProgress(defaultProgress);
  return defaultProgress;
}

export function exportProgress(progress: UserProgress): void {
  const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `atelier-cuisine-progression-${date}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export async function importProgressFile(file: File): Promise<UserProgress> {
  const text = await file.text();
  const parsed = JSON.parse(text) as UserProgress;
  if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.completedRecipes)) {
    throw new Error('Fichier de progression invalide.');
  }
  const next = { ...defaultProgress, ...parsed, version: 1 };
  saveProgress(next);
  return next;
}
