# Référencement de Negro Services

## Changements apportés

- Pré-rendu HTML de l’accueil, des services, du portfolio, de la présentation et du contact. Le contenu est lisible dans la réponse HTML, sans exécuter JavaScript.
- Hydratation React du contenu pré-rendu, avec restauration des préférences de thème et de langue après le premier rendu pour éviter les différences entre HTML statique et application.
- Titres et descriptions uniques, en rapport avec la page et la localisation de Douala. Synchronisation lors de la navigation et du changement de langue.
- URL canoniques fondées sur `https://www.negro-services.com`, destination observée de la redirection du domaine communiqué.
- Sitemap contenant les cinq pages publiques ; déclaration du sitemap dans robots.txt.
- Données structurées Organization, WebSite et WebPage/ContactPage/AboutPage. Aucune note, aucun avis ni résultat commercial inventé.
- Image de partage PNG 1200 × 630 aux couleurs de Negro Services ; balises Open Graph et Twitter par page.
- Informations locales et questions pratiques sur l’accueil, sans promesse de tarif ou de délai.
- Page 404 pré-rendue avec `noindex`, sans canonique trompeuse vers l’accueil.
- Vérification automatique du HTML et des ressources générés à chaque build.

## Après publication

Ces modifications ne sont pas encore déployées sur le domaine public. Publier le dossier `dist/` après `npm run build`.

1. Vérifier que chaque route sert son propre HTML, y compris en accès direct, et qu’une URL inexistante retourne réellement HTTP 404. Ne pas remplacer toutes les pages manquantes par l’accueil avec HTTP 200.
2. Conserver une seule version du domaine en HTTPS et des redirections permanentes cohérentes. La version canonique actuelle est avec `www`. Les URL internes hors accueil sont sans barre finale.
3. Vérifier que `https://www.negro-services.com/sitemap.xml` et `https://www.negro-services.com/robots.txt` sont accessibles.
4. Ajouter ou vérifier la propriété du domaine dans Google Search Console, puis soumettre le sitemap. Cette étape nécessite l’accès du propriétaire au domaine/compte Google.
5. Utiliser l’inspection d’URL pour vérifier le HTML rendu et demander l’indexation des pages importantes. Valider aussi les données structurées avec les outils Google/Schema.org.
6. Confirmer les coordonnées de l’entreprise et ajouter des réalisations réellement documentées. Pour la visibilité locale, compléter une fiche Google Business Profile si l’activité y est éligible, avec des coordonnées cohérentes et des avis authentiques.

L’anglais est actuellement un changement d’interface sur les mêmes URL. Pour un référencement bilingue autonome, créer ultérieurement de vraies routes anglaises traduites et les relier par `hreflang`.

Les améliorations techniques facilitent l’exploration et la compréhension du site ; elles ne garantissent pas une position dans les résultats ni un délai d’indexation.

## Références

- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://react.dev/reference/react-dom/client/hydrateRoot
