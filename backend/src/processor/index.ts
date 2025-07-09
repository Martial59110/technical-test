import { startSubscriber } from './subscriber';
import logger from '../shared/logger';

async function main() {
  await startSubscriber();
}

main().catch((err) => {
 
 logger.error('Processor crashed:', err);
});