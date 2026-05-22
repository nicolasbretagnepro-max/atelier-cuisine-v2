import type { Recipe, UserProgress } from '../types';
import { navigate } from '../App';
import RecipeCard from '../components/RecipeCard';
import { isRecipeCompleted } from '../utils/storage';
import { skillLabel } from '../utils/recipes';

interface Props {
  recipes: Recipe[];
  progress: UserProgress;
  recommendedRecipe?: Recipe;
  onChooseWeeklyRecipe: (recipeId: string) => void;
}

export default function HomePage({ recipes, progress, recommendedRecipe, onChooseWeeklyRecipe }: Props) {
  const completedCount = progress.completedRecipes.length;
  const bonusRecipes = recipes
    .filter((recipe) => recipe.id !== recommendedRecipe?.id && !isRecipeCompleted(progress, recipe.id))
    .slice(0, 3);

  return (
    <section className="page-stack">
      <header className="hero">
        <p className="eyebrow">Atelier Cuisine</p>
        <h1>Une recette par semaine pour progresser sans pression.</h1>
        <p>Choisis une recette claire, cuisine en mode guidé, puis conserve ta progression.</p>
      </header>

      {recommendedRecipe && (
        <article className="featured-card">
          <p className="eyebrow">Cette semaine</p>
          <h2>{recommendedRecipe.title}</h2>
          <p>{recommendedRecipe.description}</p>
          <div className="info-grid">
            <span>{recommendedRecipe.durationMinutes} min</span>
            <span>Niveau {recommendedRecipe.level}/5</span>
            <span>{skillLabel(recommendedRecipe.mainSkill)}</span>
          </div>
          <div className="button-row">
            <button type="button" onClick={() => navigate(`/cuisiner/${recommendedRecipe.id}`)}>Commencer</button>
            <button className="secondary" type="button" onClick={() => navigate(`/recette/${recommendedRecipe.id}`)}>Voir la fiche</button>
          </div>
        </article>
      )}

      <section className="card compact">
        <h2>Progression</h2>
        <p>{completedCount} recette{completedCount > 1 ? 's' : ''} réalisée{completedCount > 1 ? 's' : ''}.</p>
        <button className="secondary full-width" type="button" onClick={() => navigate('/progression')}>Voir le détail</button>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>Si tu as plus de temps</h2>
          <button className="text-button" type="button" onClick={() => navigate('/catalogue')}>Catalogue</button>
        </div>
        <div className="card-list">
          {bonusRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} progress={progress} onChooseWeeklyRecipe={onChooseWeeklyRecipe} />
          ))}
        </div>
      </section>
    </section>
  );
}
