# Atelier Cuisine

Application web personnelle pour progresser en cuisine au rythme d'une recette par semaine.

## Fonctionnalites V1

- Accueil avec recette recommandee
- Catalogue de recettes filtreable
- Fiche recette detaillee
- Mode cuisine pas a pas
- Favoris
- Recettes realisees
- Progression par competences
- Export / import de la progression en JSON
- Donnees de recettes separees dans `public/data/recipes.json`

## Installation locale

```bash
npm install
npm run dev
```

Puis ouvrir l'URL affichee par Vite.

## Build

```bash
npm run build
npm run preview
```

## Ajouter une recette

Modifier le fichier :

```txt
public/data/recipes.json
```

Chaque recette doit garder un `id` stable. Ne jamais modifier un `id` deja utilise, sinon la progression locale ne pourra plus retrouver la recette.

Champs minimum :

```json
{
  "id": "cake-citron",
  "title": "Cake au citron",
  "description": "Description courte.",
  "category": "dessert",
  "cuisine": "francaise",
  "diet": ["vegetarien"],
  "level": 1,
  "durationMinutes": 55,
  "activeTimeMinutes": 15,
  "budget": "faible",
  "effort": 2,
  "desire": 5,
  "servings": 6,
  "mainSkill": "cuisson-four",
  "skills": ["patisserie"],
  "tags": ["dessert"],
  "ingredients": [],
  "equipment": [],
  "steps": []
}
```

## Donnees de progression

La progression est stockee localement dans le navigateur, via `localStorage`.

Pour eviter toute perte :

1. Aller dans Reglages
2. Cliquer sur Exporter ma progression
3. Conserver le fichier JSON
4. Le reimporter si besoin

## Deploiement GitHub Pages

Un workflow GitHub Actions est inclus dans :

```txt
.github/workflows/deploy.yml
```

Dans GitHub :

1. Aller dans Settings > Pages
2. Choisir GitHub Actions comme source
3. Pousser le projet sur la branche `main`
4. Le site sera construit et publie automatiquement

## Utilisation sur iPhone

1. Ouvrir l'URL GitHub Pages dans Safari
2. Partager
3. Ajouter a l'ecran d'accueil
