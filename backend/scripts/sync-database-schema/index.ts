import { sequelize } from '../../src/config/db';
import { createModels, syncDatabaseSchema } from '../../src/db/index';

/**
 * This script synchronizes the Database Schema to
 * bring the database schema in line with sequelize.
 *
 * Not intended to be run often or automated.
 */
try {
  syncDatabaseSchema(createModels(sequelize)).then(() => {
    console.log('SYNC SCHEMA SUCCESSFUL');
    process.exit(0);
  }).catch((error) => {
    console.error('FATAL ERROR. SYNC SCHEMA FAILED (PROMISE).', error);
    process.exit(1);
  });
} catch (error) {
  console.error('FATAL ERROR. SYNC SCHEMA FAILED (ROOT).', error);
  process.exit(2);
}
