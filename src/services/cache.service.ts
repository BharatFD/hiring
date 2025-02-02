import client from '../config/redis.config';

// Get data from the cache
const getFromCache = async (key: string): Promise<any> => {
  console.log(`Fetching from cache for key: ${key}`);

  try {
    const data = await client.get(key);
    console.log(`Cache data for key ${key}:`, data);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('Cache error:', err);
    throw err;
  }
};

// Set data to the cache
const setToCache = async (key: string, data: any, ttl: number = 5400): Promise<void> => {
  console.log(`Setting cache for key: ${key}`);
  try {
    await client.setEx(key, ttl, JSON.stringify(data)); // Use setEx instead of setex (camelCase in newer versions)
  } catch (err) {
    console.error('Error setting cache:', err);
  }
};

export { getFromCache, setToCache };
