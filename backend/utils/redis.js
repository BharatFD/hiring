import  {createClient} from 'redis';
import  dotenv from 'dotenv';

dotenv.config();

export const redisClient = new createClient();
