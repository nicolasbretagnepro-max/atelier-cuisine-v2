import type { Recipe, UserProgress } from '../types';
import { navigate } from '../App';
import { formatBudget, skillLabel } from '../utils/recipes';
import { isFavorite, isRecipeCompleted, markRecipeCompleted, toggleFavorite } from '../utils/storage';

interface Props {
  recipe?: Recipe;
  progress: UserProgress;
  onProgressChange: (progress: UserProgress) => void;
}

export default function RecipePage({ recipe, progress, onProgressChange }: Props) {
  if (!recipe) {
    return <div className="card"><h1>Recette introuvable</h1><button onClick={() => navigate('/catalogue')}>Retour au catalogue</button></div>;
  }

  const completed = isRecipeCompleted(progress, recipe.id);
  const favorite = isFavorite(progress, recipe.id);

  return (
    <section className="page-stack">
      <button className="text-button left" type="button" onClick={() => navigate('/catalogue')}>← Catalogue</button>
      <article className="featured-card">
        <div className="card-topline">
          <span className="pill">{recipe.category}</span>
          <span className="muted">{recipe.cuisine}</span>
        </div>
        <h1>{recipe.title}</h1>
        <p>{recipe.description}</p>
        <div className="info-grid">
          <span>{recipe.durationMinutes} min</span>
          <span>Actif {recipe.activeTimeMinutes} min</span>
          <span>Niveau {recipe.level}/5</span>
          <span>{formatBudget(recipe.budget)}</span>
        </div>
        <p><strong>Objectif :</strong> {skillLabel(recipe.mainSkill)}</p>
        <div className="button-row">
          <button type="button" onClick={() => navigate(`/cuisiner/${recipe.id}`)}>Lancer la recette</button>
          <button className="secondary" type="button" onClick={() => onProgressChange(toggleFavorite(progress, recipe.id))}>{favorite ? 'Retirer favori' : 'Ajouter favori'}</button>
        </div>
        {completed && <p className="success-note">Recette déjà réalisée.</p>}
      </article>

      <section className="card">
        <h2>Ingrédients</h2>
        <ul className="clean-list">
          {recipe.ingredients.map((ingredient) => (
            <li key={`${ingredient.name}-${ingredient.unit ?? ''}`}>
              <span>{ingredient.name}</span>
              <strong>{ingredient.quantity ? `${ingredient.quantity} ${ingredient.unit ?? ''}` : ingredient.note ?? ''}</strong>
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>Matériel</h2>
        <div className="tag-row">{recipe.equipment.map((item) => <span key={item}>{item}</span>)}</div>
      </section>

      <section className="card">
        <h2>Étapes</h2>
        <ol className="step-preview">
          {recipe.steps.map((step) => <li key={step.id}>{step.title}</li>)}
        </ol>
      </section>

      <button className="secondary full-width" type="button" onClick={() => onProgressChange(markRecipeCompleted(progress, recipe))}>
        Marquer comme faite
      </button>
    </section>
  );
}
