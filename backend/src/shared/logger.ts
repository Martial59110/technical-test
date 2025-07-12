import pino from 'pino';

/**
 * Ce fichier configure et exporte un logger basé sur pino.
 * - Permet d'avoir des logs structurés et colorés pour le développement.
 * - Le niveau de log peut être ajusté via la variable d'environnement LOG_LEVEL.
 * 
 * Utilisé partout dans le projet pour logguer les infos, warnings et erreurs.
 */

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
});

export default logger; 