export type RecipeCategory = 'plat' | 'dessert' | 'technique';
export type Budget = 'faible' | 'moyen' | 'eleve';

export interface Ingredient {
  name: string;
  quantity?: number | string;
  unit?: string;
  note?: string;
}

export interface RecipeStep {
  id: string;
  title: string;
  action: string;
  why?: string;
  sensoryCue?: string;
  commonMistake?: string;
  timerMinutes?: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: RecipeCategory;
  cuisine: string;
  diet: string[];
  level: number;
  durationMinutes: number;
  activeTimeMinutes: number;
  budget: Budget;
  effort: number;
  desire: number;
  servings: number;
  mainSkill: string;
  skills: string[];
  tags: string[];
  ingredients: Ingredient[];
  equipment: string[];
  steps: RecipeStep[];
  commonErrors?: string[];
  variants?: string[];
  isCertified?: boolean;
}

export interface CompletedRecipe {
  recipeId: string;
  completedAt: string;
  rating?: number;
  difficultyFelt?: number;
  realDurationMinutes?: number;
  notes?: string;
  wouldCookAgain?: boolean;
}

export interface SkillProgress {
  level: number;
  practiceCount: number;
  lastPracticedAt: string;
}

export interface UserProgress {
  version: number;
  completedRecipes: CompletedRecipe[];
  favoriteRecipeIds: string[];
  activeWeeklyRecipeId: string | null;
  skillProgress: Record<string, SkillProgress>;
  lastUpdatedAt: string;
}
