## Règles de gestion de l’application

### 1. Création de tâche de calcul

- L’utilisateur (ou le frontend) peut demander un calcul en envoyant une requête POST au collecteur.
- Chaque calcul doit porter sur exactement deux opérandes (nombres).
- L’opération demandée doit être l’une des suivantes : addition, soustraction, multiplication, division.
- Si la requête ne respecte pas ces contraintes, elle est rejetée avec un message d’erreur explicite.

### 2. File d’attente et stockage

- Chaque calcul valide est transformé en tâche, identifiée de façon unique.
- La tâche est stockée dans une file d’attente Redis avec le statut pending.

### 3. Traitement des tâches

- Un processeur lit les tâches en attente dans Redis.
- Il valide à nouveau la tâche avant de la traiter.
- Il effectue le calcul demandé.
- Si le calcul réussit, le résultat est stocké dans la tâche avec le statut success.
- Si le calcul échoue (ex : division par zéro, opération inconnue), le statut passe à failed et le champ résultat contient le message d’erreur.

### 4. Consultation des tâches

- Il est possible de lister toutes les tâches et leurs résultats via une route dédiée (GET).

### 5. Gestion des erreurs

- Toute erreur de validation ou d’exécution est loggée et renvoyée de façon structurée.
- Les erreurs système (ex : Redis indisponible) sont loggées et renvoient un message d’erreur générique au client.

### 6. Dockerisation et documentation

- Le projet doit être exécutable via Docker (docker-compose, Dockerfile).
- Un fichier README clair explique comment lancer et utiliser le projet.
