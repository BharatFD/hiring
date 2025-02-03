import redis from "../config/redis.js";

export const cacheFAQs = async (req, res, next) => {
  const data = await redis.get("faqs");
  if (data) return res.json(JSON.parse(data));
  next();
};
