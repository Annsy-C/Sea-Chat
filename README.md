# Sea-Chat
Application chat avec React Typescript et Node Typescript

### Architecture globale du projet et choix techniques

L'application est composée de trois parties :
* un front écrit en React Typescript généré grâce à l'outil create-react-app.
* un serveur Node.js écrit à l'aide de express.js et de Typescript.
* une base de donnée PostgreSQL.

Pour la partie front, choix de l'utilisation de la librairie de composants Next UI et de React Router pour la gestion des routes.
Il a aussi été choisi de faire appel au contexte React pour conserver le token d'authentification plutôt que de stocker l'information dans le navigateur pour pouvoir faire une démonstration plus facilement.

Pour la partie back, choix de l'utilisation d'une base de donnée PostgreSQL en tant que technologie open source efficace et car l'hebergeur utilisé (render.com) permet d'instancier gratuitement des bases de données de ce type.
Pour le serveur Node.js, utilisation du framework express pour une organisation plus facile du code et une écriture des routes plus rapides. C'est un framework très populaire, beaucoup de modules et de middlewares ont été développés pour lui, notamment pour les CORS et les websockets mais aussi les librairies de gestion de PostgreSQL et de jsonwebtoken.

### Procédure d'installation en local

* Installation de PostgreSQL en local et jouer la migration dans `./back/migrations/database.pg`
* Dans le dossier back, executer la commande `npm install` puis exporter les variables d'environnement attendues : `TOKEN_KEY`, `PGDATABASE` et `FRONT_URL` puis executer la commande `npm start`
* Dans le dossier front, executer la commande `npm install` puis exporter les variables d'environnement attendues : `REACT_APP_BACK_URL` et `REACT_APP_WS_URL` puis executer la commande `npm start`

Version de demonstration disponible à l'adresse : https://seachatfront.onrender.com

### Auto-critique du travail réalisé, perspectives

Le système de chat est fonctionnel mais nécéssite d'être amélioré, notamment au niveau des vérifications (email à l'inscription) et de fonctionnalités de navigation classiques (quitter un salon, modifier ou supprimer un message ou un salon, gérer son profil utilisateur,...).

L'utilisation des websocket permet actuellement de provoquer le rafraichissement de tous les messages au lieu de juste distribuer un nouveau message à tous les participants, ce qui n'est pas optimal.

La gestion des erreurs est actuellement effectuée via un système d'alerte et nécessiterait donc d'être améliorée.

Plus de tests unitaires et fonctionnels pourront être mis en place à l'avenir.
