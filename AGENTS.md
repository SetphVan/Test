# La Cagnotte

Petite app sans aucune dépendance : HTML, CSS et JavaScript en modules, servie par `serveur.mjs`.

- Lancer : `npm start`, puis http://localhost:3006
- Tous les tests : `npm test`. Un seul fichier : `node --test tests/01-virgule.test.js`
- `lib/` porte la logique, et c'est elle que les tests vérifient. `app.js` branche cette logique sur la page.
- Ne jamais ajouter de dépendance npm.
- Ne jamais modifier un test existant pour le faire passer : on corrige le code.
