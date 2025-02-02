import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { app } from '..'; 
import FAQ from '../models/faq.model';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { request } from 'chai-http';
chai.use(chaiHttp);
const { expect } = chai;

describe('FAQ Controller', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('GET /api/faqs', () => {
    it('should fetch FAQs from the database', async () => {
      const faqs = [{ question: 'Test Question', answer: 'Test Answer' }];
      const translatedFAQs = [{ question: 'Test Question', answer: 'Test Answer' }];

      // Mock the database query
      sandbox.stub(FAQ, 'find').resolves(faqs);
      const res = await request(app).get('/api/faqs?lang=en');

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(translatedFAQs);
    });

    it('should handle database errors', async () => {
      // Mock the database query to throw an error
      sandbox.stub(FAQ, 'find').rejects(new Error('Database error'));

      const res = await request(app).get('/api/faqs?lang=en');

      expect(res.status).to.equal(500);
      expect(res.body.message).to.equal('Database error');
    });
  });

  describe('POST /api/faqs', () => {
    it('should create a new FAQ with translations', async () => {
      const newFAQ = {
        question: 'What is Node.js?',
        answer: 'Node.js is a runtime environment.',
      };

      // Mock the FAQ save method
      sandbox.stub(FAQ.prototype, 'save').resolves({
        ...newFAQ,
        translations: {
          hi: { question: 'Node.js क्या है?', answer: 'Node.js एक रनटाइम वातावरण है।' },
          bn: { question: 'Node.js কি?', answer: 'Node.js একটি রানটাইম পরিবেশ।' },
        },
      });

      const res = await request(app)
        .post('/api/faqs')
        .send(newFAQ);

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('question', 'What is Node.js?');
      expect(res.body).to.have.property('answer', 'Node.js is a runtime environment.');
      expect(res.body.translations.hi).to.deep.equal({
        question: 'Node.js क्या है?',
        answer: 'Node.js एक रनटाइम वातावरण है।',
      });
      expect(res.body.translations.bn).to.deep.equal({
        question: 'Node.js কি?',
        answer: 'Node.js একটি রানটাইম পরিবেশ।',
      });
    });

    it('should handle errors when creating a new FAQ', async () => {
      const newFAQ = {
        question: 'What is Node.js?',
        answer: 'Node.js is a runtime environment.',
      };

      // Mock the FAQ save method to throw an error
      sandbox.stub(FAQ.prototype, 'save').rejects(new Error('Failed to save FAQ'));

      const res = await request(app)
        .post('/api/faqs')
        .send(newFAQ);

      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('Failed to save FAQ');
    });
  });
});
