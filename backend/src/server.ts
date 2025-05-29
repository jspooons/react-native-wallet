import express, { Request, Response } from 'express';
import { sequelize, connectToDb } from './config/db';
import { createModels } from './db/index';
import { connectToRedis, createLimiter } from './config/redis';
import transactionsRoute from './routes/transactionsRoute';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const db = createModels(sequelize);

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  await connectToDb();
  await connectToRedis();

  app.set('db', db);

  const limiter = createLimiter();

  // middleware
  app.use(express.json());
  app.use(limiter);
  app.use('/api/transactions', transactionsRoute);

  app.listen(PORT, async () => {
    console.log('Server is up and running on PORT:5001');
  });
};

startServer();

export { db };
