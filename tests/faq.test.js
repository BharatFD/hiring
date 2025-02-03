import { expect } from "chai";
import request from "supertest";
import app from "../index.js"; // Path to your Express server

describe("FAQ API", () => {
  let faqId;

  // Test for Create FAQ
  it("should create a new FAQ", async () => {
    const res = await request(app)
      .post("/api/faqs")
      .send({
        question: "What is Node.js?",
        answer: "Node.js is a JavaScript runtime built on Chrome's V8 engine.",
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("question", "What is Node.js?");
    expect(res.body).to.have.property("answer", "Node.js is a JavaScript runtime built on Chrome's V8 engine.");
    faqId = res.body._id; // Save the created FAQ's ID for future tests
  });

  // Test for Get all FAQs
  it("should get all FAQs", async () => {
    const res = await request(app).get("/api/faqs");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.greaterThan(0);
  });

  // Test for Get FAQ by ID
  it("should get FAQ by ID", async () => {
    const res = await request(app).get(`/api/faqs/${faqId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("question", "What is Node.js?");
    expect(res.body).to.have.property("answer", "Node.js is a JavaScript runtime built on Chrome's V8 engine.");
  });

  // Test for Update FAQ
  it("should update an FAQ", async () => {
    const res = await request(app)
      .put(`/api/faqs/${faqId}`)
      .send({
        question: "What is Node.js updated?",
        answer: "Updated answer for Node.js.",
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("question", "What is Node.js updated?");
    expect(res.body).to.have.property("answer", "Updated answer for Node.js.");
  });

  // Test for Delete FAQ
  it("should delete an FAQ", async () => {
    const res = await request(app).delete(`/api/faqs/${faqId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "FAQ deleted successfully");
  });
});
