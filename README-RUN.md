# README-RUN.md

## Comment lancer le projet

Ce projet est entièrement dockerisé. Vous pouvez lancer le backend (collecteur + processeur), le frontend, et Redis en une seule commande.

---

### 1. **Prérequis**

- [Docker](https://www.docker.com/products/docker-desktop) installé sur votre machine.

---

### 2. **Configuration des variables d'environnement**

**Étape obligatoire** : Créez un fichier `.env` à la racine du projet en copiant le fichier `.env.example` :

```bash
cp .env.example .env
```

Puis modifiez le fichier `.env` avec vos valeurs :

```env
COLLECTOR_PORT=3000
PROCESSOR_PORT=3001
FRONT_PORT=4173
LOG_LEVEL=info
REDIS_URL=redis://database:6379
```

---

### 3. **Démarrer tous les services**

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

### 4. **Accéder à l'application**

- **Frontend (UI de la calculatrice)** :  
  [http://localhost:4173](http://localhost:4173)

- **API Collector** :  
  [http://localhost:3000](http://localhost:3000)

- **API Processor** :  
  [http://localhost:3001](http://localhost:3001)

- **RedisInsight (UI pour Redis)** :  
  [http://localhost:5540](http://localhost:5540)

---

### 5. **Arrêter tous les services**

Pour arrêter et supprimer tous les conteneurs :

```bash
docker compose down
```

---

### 6. **Dépannage**

- Si vous modifiez le code, relancez avec `--build` pour reconstruire les images.
- Pour réinitialiser les données Redis, ajoutez l'option `-v` :
  ```bash
  docker compose down -v
  ```

---

### 7. **Sans Docker (pour le développement)**

Vous pouvez aussi lancer chaque partie localement (nécessite Node.js 20+) :

**Prérequis** :
- Créez un fichier `.env` à la racine avec les valeurs pour le développement local :
  ```env
  COLLECTOR_PORT=3000
  PROCESSOR_PORT=3001
  FRONT_PORT=4173
  LOG_LEVEL=info
  REDIS_URL=redis://localhost:6379
  ```

**Lancement** :
- **Backend (Collector)** :
  ```bash
  cd backend
  npm install
  npm run dev
  ```
- **Backend (Processor)** :
  ```bash
  cd backend
  npm run dev:processor
  ```
- **Frontend** :
  ```bash
  cd front
  npm install
  npm run dev
  ```
- **Redis** :
  Installez et lancez Redis localement, ou utilisez Docker uniquement pour Redis :
  ```bash
  docker run -d -p 6379:6379 redis:latest
  ```

---

**Voilà !**
