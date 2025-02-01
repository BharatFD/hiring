import request from "supertest";
import { describe, it, beforeAll, afterAll, expect } from "@jest/globals";
import app from "../index"; // Ensure this is your Express app instance
import RedisService from "../utils/redis-client";
import PrismaSingleton from "../utils/prisma-client";

const redisClient = RedisService.getInstance();

describe("FAQ API Tests", () => {
  let faqId: number;

  beforeAll(async () => {
    // Ensure the database is clean
    await PrismaSingleton.getInstance().faq.deleteMany();
  });

  afterAll(async () => {
    // Close database and Redis connections after tests
    await PrismaSingleton.getInstance().$disconnect();
    await redisClient.quit();
  });

  it("should create a new FAQ", async () => {
    const res = await request(app)
      .post("/api/faqs")
      .send({
        question: "What is Redis?",
        answer: "Redis is an in-memory database.",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    faqId = res.body.id;
  });

  it("should fetch all FAQs", async () => {
    const res = await request(app).get("/api/faqs");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should fetch FAQs in Hindi", async () => {
    const res = await request(app).get("/api/faqs?lang=hi");
    expect(res.status).toBe(200);
    expect(res.body[0].question).not.toBe("What is Redis?");
  });

  it("should delete an FAQ", async () => {
    const res = await request(app).delete(`/api/faqs/${faqId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("FAQ deleted");
  });

  it("should return 404 when fetching a deleted FAQ", async () => {
    const res = await request(app).get(`/api/faqs/${faqId}`);
    expect(res.status).toBe(404);
  });
});

describe("Redis Tests", () => {
  it("should set and get a value from Redis", async () => {
    await redisClient.set("test_key", "test_value", 10);
    const value = await redisClient.get("test_key");
    expect(value).toBe("test_value");
  });

  it("should delete a key from Redis", async () => {
    await redisClient.del("test_key");
    const value = await redisClient.get("test_key");
    expect(value).toBeNull();
  });
});
