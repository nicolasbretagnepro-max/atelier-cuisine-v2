import { useState } from 'react';
import type { Recipe, UserProgress } from '../types';
import { navigate } from '../App';
import { markRecipeCompleted } from '../utils/storage';
import ProgressBar from '../components/ProgressBar';

interface Props {
  recipe?: Recipe;
  progress: UserProgress;
  onProgressChange: (progress: UserProgress) => void;
}

export default function CookPage({ recipe, progress, onProgressChange }: Props) {
  const [index, setIndex] = useState(0);
  const [showWhy, setShowWhy] = useState(false);
  const [showCue, setShowCue] = useState(false);
  const [showMistake, setShowMistake] = useState(false);

  if (!recipe) {
    return <div className="card"><h1>Recette introuvable</h1><button onClick={() => navigate('/catalogue')}>Retour</button></div>;
  }

  const step = recipe.steps[index];
  const isLast = index === recipe.steps.length - 1;

  function next() {
    setShowWhy(false);
    setShowCue(false);
    setShowMistake(false);
    if (isLast) {
      onProgressChange(markRecipeCompleted(progress, recipe));
      navigate(`/recette/${recipe.id}`);
      return;
    }
    setIndex(index + 1);
  }

  return (
    <section className="cook-mode">
      <div className="cook-header">
        <button className="text-button left" type="button" onClick={() => navigate(`/recette/${recipe.id}`)}>Quitter</button>
        <p>{index + 1} / {recipe.steps.length}</p>
      </div>
      <ProgressBar current={index + 1} total={recipe.steps.length} />

      <article className="cook-card">
        <p className="eyebrow">{recipe.title}</p>
        <h1>{step.title}</h1>
        <p className="cook-action">{step.action}</p>
        {step.timerMinutes && <p className="timer-note">Repère temps : {step.timerMinutes} min</p>}
      </article>

      <div className="accordion-stack">
        {step.why && (
          <button className="accordion" type="button" onClick={() => setShowWhy(!showWhy)}>
            <strong>Pourquoi ?</strong>
            {showWhy && <span>{step.why}</span>}
          </button>
        )}
        {step.sensoryCue && (
          <button className="accordion" type="button" onClick={() => setShowCue(!showCue)}>
            <strong>Repère sensoriel</strong>
            {showCue && <span>{step.sensoryCue}</span>}
          </button>
        )}
        {step.commonMistake && (
          <button className="accordion" type="button" onClick={() => setShowMistake(!showMistake)}>
            <strong>Erreur fréquente</strong>
            {showMistake && <span>{step.commonMistake}</span>}
          </button>
        )}
      </div>

      <div className="cook-actions">
        <button className="secondary" type="button" onClick={() => setIndex(Math.max(0, index - 1))} disabled={index === 0}>Précédent</button>
        <button type="button" onClick={next}>{isLast ? 'Terminer' : 'Suivant'}</button>
      </div>
    </section>
  );
}
