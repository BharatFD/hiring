import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import faqRoutes from './routes/faqRoutes'


// Initialize the Express application
const app = express();

// Middleware
app.use(cors());               // Enable CORS for cross-origin requests
app.use(express.json());        // Parse JSON request bodies

// API Routes
app.use('/api', faqRoutes);

// Default Route for Testing Server
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the FAQ Management API!');
});

// Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});



// Start the Server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
