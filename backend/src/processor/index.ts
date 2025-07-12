import { startSubscriber } from './subscriber';
import logger from '../shared/logger';

/**
 * Point d'entrée du processeur.
 * - Démarre le subscriber qui va écouter les tâches à traiter via Redis.
 * - Gère les erreurs globales et loggue si le processeur crash.
 * 
 * Ce fichier lance le worker qui traite les calculs en arrière-plan.
 */

async function main() {
  await startSubscriber();
}

main().catch((err) => {
 
 logger.error('Processor crashed:', err);
});