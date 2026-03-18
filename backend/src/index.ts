import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import { connectDB } from './config/db';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth';
import destinationRoutes from './routes/destinations';
import packageRoutes from './routes/packages';
import inquiryRoutes from './routes/inquiries';

const app = express();

// Middleware
// Allow web frontend and mobile app (Expo Go uses device IP, not localhost)
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman) and localhost
    if (!origin || origin.startsWith('http://localhost') || origin.startsWith('http://192.168')) {
      callback(null, true);
    } else {
      callback(null, true); // In dev, allow all origins
    }
  },
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/inquiries', inquiryRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

// Start server
const start = async () => {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`Voyage API running on port ${config.port}`);
  });
};

start();
