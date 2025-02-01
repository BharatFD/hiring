import Redis from "ioredis";

class RedisService {
  private static instance: RedisService;
  private redisClient: Redis;

  // Private constructor to prevent instantiation
  private constructor() {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST || "localhost",
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
      db: 0,
    });
  }

  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  public async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  public async set(key: string, value: string, ttl: number = 86400): Promise<void> {
    await this.redisClient.set(key, value, "EX", ttl);
  }

  public async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  public async quit(): Promise<void> {
    await this.redisClient.quit();
  }
}

export default RedisService;
