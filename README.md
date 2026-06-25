# Date Surprise

Site web interactif avec formulaire de date et backend local.

## Structure

- `public/` : site statique accessible aux visiteurs
- `data/responses.json` : base locale des réponses
- `server.js` : backend Express pour enregistrer et afficher les réponses

## Installation

1. Installer Node.js si nécessaire.
2. Depuis le dossier `c:\Users\wolea\Desktop\Date`, exécute :
   ```bash
   npm install express body-parser
   ```

## Lancer le site

1. Dans le dossier `c:\Users\wolea\Desktop\Date`, exécute :
   ```bash
   node server.js
   ```
2. Ouvre le navigateur sur :
   - `http://localhost:3000/` pour le formulaire
   - `http://localhost:3000/admin.html` pour consulter les réponses (token requis)

## Administration

- Le token admin est défini par défaut dans `server.js` avec `ADMIN_TOKEN`.
- Pour démarrer avec un token personnalisé :
  ```bash
  ADMIN_TOKEN=mon-token-secret node server.js
  ```

## Notes

- Les réponses sont enregistrées dans `data/responses.json`.
- Le tableau de bord admin n'est pas visible depuis le site public sans token.
