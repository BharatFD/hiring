import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Create a Redis client
const client = createClient({
  username: process.env.REDIS_USERNAME || 'default',
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : undefined,
  },
});

// Connect to Redis
const connectRedis = async (): Promise<void> => {
  try {
    await client.connect();
    console.log('✅ Redis connected successfully');
  } catch (err) {
    console.error('❌ Redis Client Error:', err);
  }
};

connectRedis();

export default client;