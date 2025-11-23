import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import './supabase.js'; // ⚠️ important sinon Supabase ne charge pas
import imagesRoutes from './routes/images.js'
import NodeCache from 'node-cache';
export const cache = new NodeCache({ stdTTL: 120, checkperiod: 180 }); // 2 min


// Load .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(helmet());
app.use(
  cors({
    origin: ['https://iron-gym-v2-kwwgldsyr-aroun77s-projects.vercel.app',
    /\.vercel\.app$/]
  })
);
app.use((req, res, next) => {
  res.setHeader('Accept', 'image/webp,image/*,*/*');
  next();
});
app.use(compression({
  level: 6,
  threshold: 0,
  filter: (req, res) => {
    if (/image\//.test(res.getHeader('Content-Type'))) return false; 
    return compression.filter(req, res);
  },
  brotli: {
    enabled: true,
    zlib: {
      level: 6,
    }
  }
}));
app.use(express.json({ limit: '5mb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// API Routes
app.use('/api/images', imagesRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Start server
app.listen(PORT, () => console.log(`🔥 Express running on port ${PORT}`));

export default app;
