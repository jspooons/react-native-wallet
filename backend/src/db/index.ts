import { Sequelize } from 'sequelize';
import { DbInterface } from './types/dbInterface';
import { initTransactionsModel } from './models/Transactions';

export const createModels = (sequelize: Sequelize) => {
  const db: DbInterface = {
    sequelize,
    Transactions: initTransactionsModel(sequelize),
  };

  return db;
};

export async function syncDatabaseSchema(db: DbInterface) {
  try {
    await db.Transactions.sync({ alter: true });
  } catch (error) {
    console.error(`syncDatabaseSchema - ${error}`);
    throw error;
  }
}
