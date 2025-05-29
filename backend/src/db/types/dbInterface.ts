import { Sequelize } from 'sequelize';
import { Transactions } from '../models/Transactions';

export interface DbInterface {
  sequelize: Sequelize;
  Transactions: typeof Transactions;
};
