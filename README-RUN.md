# README-RUN.md

## Comment lancer le projet

Ce projet est entièrement dockerisé. Vous pouvez lancer le backend (collecteur + processeur), le frontend, et Redis en une seule commande.

---

### 1. **Prérequis**

- [Docker](https://www.docker.com/products/docker-desktop) installé sur votre machine.

---

### 2. **Démarrer tous les services**

Depuis la racine du projet, lancez :

```bash
docker compose up --build
```

- Cela va builder et démarrer tous les conteneurs :  
  - **database** : serveur Redis  
  - **redis-insight** : interface graphique Redis   
  - **collector** : API Express (reçoit les calculs)  
  - **processor** : va traiter les calculs  
  - **front** : frontend SvelteKit

---

### 3. **Accéder à l'application**

- **Frontend (UI de la calculatrice)** :  
  [http://localhost:4173](http://localhost:4173)


- **RedisInsight (UI pour Redis)** :  
  [http://localhost:5540](http://localhost:5540)

---

### 4. **Arrêter tous les services**

Pour arrêter et supprimer tous les conteneurs :

```bash
docker compose down
```

---

### 5. **Dépannage**

- Si vous modifiez le code, relancez avec `--build` pour reconstruire les images.
- Pour réinitialiser les données Redis, ajoutez l’option `-v` :
  ```bash
  docker compose down -v
  ```

---

### 6. **Configuration des variables d'environnement**

**Avec Docker** : Les variables sont automatiquement configurées dans `docker-compose.yaml`.

**Sans Docker (développement local)** : Créez un fichier `.env` dans le dossier `backend/` :

```env
# Port du serveur collector
COLLECTOR_PORT=3000

# URL de connexion Redis
REDIS_URL=redis://localhost:6379

# Niveau de log (debug, info, warn, error)
LOG_LEVEL=info
```

---

### 7. **Sans Docker (pour le développement)**

Vous pouvez aussi lancer chaque partie localement (nécessite Node.js 20+) :

- **Backend** :
  ```bash
  cd backend
  npm install
  npm run dev
  ```
- **Frontend** :
  ```bash
  cd front
  npm install
  npm run dev
  ```
- **Redis** :
  Installez et lancez Redis localement, ou utilisez Docker uniquement pour Redis.

---

**Voilà !**
