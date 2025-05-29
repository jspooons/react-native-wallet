import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

const connectToRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis client connected successfully.');
  }
  catch (error) {
    console.error('Error connecting to Redis:', error);
    throw error;
  }
}

const createLimiter = () => {
  return rateLimit({
    store: new RedisStore({
      sendCommand: (...args: string[]) => redisClient.sendCommand(args),
    }),
    windowMs: 1 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests, please try again later.',
  });
};

export { connectToRedis, createLimiter };
