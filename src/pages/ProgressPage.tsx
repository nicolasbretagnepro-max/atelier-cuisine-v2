import type { Recipe, UserProgress } from '../types';
import { navigate } from '../App';
import { skillLabel } from '../utils/recipes';

interface Props {
  recipes: Recipe[];
  progress: UserProgress;
}

export default function ProgressPage({ recipes, progress }: Props) {
  const completed = progress.completedRecipes
    .map((item) => ({ progress: item, recipe: recipes.find((recipe) => recipe.id === item.recipeId) }))
    .filter((item) => item.recipe);

  const skills = Object.entries(progress.skillProgress).sort((a, b) => b[1].practiceCount - a[1].practiceCount);

  return (
    <section className="page-stack">
      <header className="page-header">
        <h1>Progression</h1>
        <p>Ce que tu as cuisiné et les compétences déjà travaillées.</p>
      </header>

      <div className="stats-grid">
        <div className="stat-card"><strong>{completed.length}</strong><span>recettes faites</span></div>
        <div className="stat-card"><strong>{skills.length}</strong><span>compétences</span></div>
        <div className="stat-card"><strong>{progress.favoriteRecipeIds.length}</strong><span>favoris</span></div>
      </div>

      <section className="card">
        <h2>Compétences</h2>
        {skills.length === 0 && <p>Aucune compétence enregistrée pour le moment.</p>}
        <div className="skill-list">
          {skills.map(([skill, value]) => (
            <div key={skill} className="skill-item">
              <span>{skillLabel(skill)}</span>
              <strong>Niveau {value.level} · {value.practiceCount} pratique{value.practiceCount > 1 ? 's' : ''}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Recettes réalisées</h2>
        {completed.length === 0 && <p>Aucune recette réalisée pour le moment.</p>}
        <div className="history-list">
          {completed.map(({ progress: item, recipe }) => (
            <button key={item.recipeId} className="history-item" type="button" onClick={() => navigate(`/recette/${item.recipeId}`)}>
              <span>{recipe?.title ?? item.recipeId}</span>
              <small>{new Date(item.completedAt).toLocaleDateString('fr-FR')}</small>
            </button>
          ))}
        </div>
      </section>
    </section>
  );
}
