import redis from 'redis';
import { ApiError, asyncHandler } from '../utils/utils.js';  

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
let client;

// Connect to Redis with proper error handling
(async () => {
  try {
    client = redis.createClient({ url: redisUrl });

    client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    await client.connect();
    console.log(`Connected to Redis on ${redisUrl}`);
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    throw new ApiError(500, 'Failed to connect to Redis', [error.message]);  
  }
})();

// Cache middleware
const cacheMiddleware = (duration) => asyncHandler(async (req, res, next) => {
  const lang = req.query.lang || 'en';
  const cacheKey = `faqs:${lang}`;

  try {
    const cachedData = await client.get(cacheKey);

    if (cachedData) {
      console.log(`Cache hit: ${cacheKey}`);
      return res.json(JSON.parse(cachedData));  
    }

    console.log(`Cache miss: ${cacheKey}`);

  
    const originalSend = res.send.bind(res);
    res.send = (body) => {
      client.setEx(cacheKey, duration, body); 
      originalSend(body);  
    };

    next();  
  } catch (error) {
    console.error('Cache error:', error);
    next(new ApiError(500, 'Cache retrieval error', [error.message]));  
  }
});

export default cacheMiddleware;
