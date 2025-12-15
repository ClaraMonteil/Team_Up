# Démo “Apple-like scrolling” (sections sticky, animations liées au scroll)

Ce projet montre comment reproduire le style de défilement observé sur les pages produits d’Apple :
- Section épinglée (pinning) : un panneau reste fixe pendant que le contenu progresse.
- Animations douces liées au scroll (sans librairie lourde), avec fallback `IntersectionObserver`.
- Galerie horizontale avec `scroll-snap`.

## Déployer sur GitHub Pages

Option A — via Settings (le plus simple) :
1. Créez ce dépôt et ajoutez les fichiers à la racine.
2. Settings → Pages → “Deploy from a branch” → Branch: `main` / Folder: `/` (root).
3. L’URL sera `https://ClaraMonteil.github.io/Team_Up/`.

Option B — via GitHub Actions (auto) :
- Ajoutez `.github/workflows/pages.yml`. À chaque push sur `main`, le site est déployé automatiquement.

## Personnalisation

- Remplacez la fausse “device” par des images/vidéos produit (optimisées `webp/avif`).
- Ajustez `.sticky { height: 360vh; }` pour la longueur de la séquence.
- Modifiez les animations basées sur `--progress` dans `styles.css`.
