import { useMemo, useState } from 'react';
import type { Recipe, UserProgress } from '../types';
import RecipeCard from '../components/RecipeCard';
import { isFavorite, isRecipeCompleted } from '../utils/storage';

interface Props {
  recipes: Recipe[];
  progress: UserProgress;
  onChooseWeeklyRecipe: (recipeId: string) => void;
}

const filters = [
  { id: 'all', label: 'Tout' },
  { id: 'plat', label: 'Plats' },
  { id: 'dessert', label: 'Desserts' },
  { id: 'vegetarien', label: 'Végétarien' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'monde', label: 'Monde' },
  { id: 'rapide', label: 'Rapide' },
  { id: 'favoris', label: 'Favoris' },
  { id: 'faits', label: 'Déjà faits' }
];

export default function CataloguePage({ recipes, progress, onChooseWeeklyRecipe }: Props) {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const filteredRecipes = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recipes.filter((recipe) => {
      const matchesQuery = !q || [recipe.title, recipe.description, recipe.cuisine, recipe.mainSkill, ...recipe.tags].join(' ').toLowerCase().includes(q);
      if (!matchesQuery) return false;
      if (filter === 'all') return true;
      if (filter === 'plat' || filter === 'dessert') return recipe.category === filter;
      if (filter === 'vegetarien' || filter === 'vegan') return recipe.diet.includes(filter);
      if (filter === 'monde') return recipe.tags.includes('cuisine-du-monde');
      if (filter === 'rapide') return recipe.durationMinutes <= 30;
      if (filter === 'favoris') return isFavorite(progress, recipe.id);
      if (filter === 'faits') return isRecipeCompleted(progress, recipe.id);
      return true;
    });
  }, [recipes, progress, filter, query]);

  return (
    <section className="page-stack">
      <header className="page-header">
        <h1>Catalogue</h1>
        <p>Explore les recettes par envie, niveau, durée ou type de cuisine.</p>
      </header>

      <input
        className="search-input"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Chercher une recette, une compétence..."
      />

      <div className="filter-row" role="tablist">
        {filters.map((item) => (
          <button key={item.id} className={filter === item.id ? 'active' : ''} type="button" onClick={() => setFilter(item.id)}>
            {item.label}
          </button>
        ))}
      </div>

      <div className="card-list">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} progress={progress} onChooseWeeklyRecipe={onChooseWeeklyRecipe} />
        ))}
      </div>
    </section>
  );
}
