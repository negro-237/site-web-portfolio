# Negro Services

Site vitrine React + Vite de Negro Services, studio digital indépendant à Douala.

## Développement

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

Le build produit dans `dist/` les cinq pages HTML pré-rendues, leurs ressources, `sitemap.xml`, `robots.txt` et `404.html`. Le rendu serveur temporaire est écrit dans `dist-ssr/` ; seul `dist/` doit être publié. Les interactions React sont attachées au HTML existant avec `hydrateRoot`.

## Contrôles

```sh
npx tsc --noEmit
npm test
npm run check:seo
```

Le contrôle SEO s’exécute aussi automatiquement à la fin du build : contenu sans JavaScript, métadonnées uniques, canoniques, liens internes, ressources, données structurées, sitemap et exclusion de la page 404.

## Hébergement

Le domaine canonique est `https://www.negro-services.com`, destination de la redirection publique observée depuis `https://negro-services.com`. La configuration éditoriale est centralisée dans `src/lib/seo.ts`.

Configurer l’hébergeur pour servir les fichiers HTML de chaque route (`services.html`, `about.html`, etc., ou les fichiers `index.html` dans les sous-dossiers). Pour une URL inconnue, servir `404.html` avec un vrai statut HTTP 404, sans réécrire toutes les requêtes vers l’accueil avec un statut 200. Les liens et canoniques utilisent les URL sans barre finale hors accueil ; conserver cette convention dans les redirections de l’hébergeur. Les modalités exactes dépendent du service d’hébergement.

Le français est la langue publique pré-rendue. Le choix anglais reste une préférence d’interface mémorisée. Il n’existe pas encore d’URL anglaises distinctes : aucune fausse balise `hreflang` n’est générée.

Voir `REFERENCEMENT.md` pour les changements et les étapes à effectuer sur le site en production.
