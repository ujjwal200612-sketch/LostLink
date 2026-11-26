const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { notFound, errorHandler } = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Database access is handled through the Supabase client.

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://lost-link-d745ie64y-lost-link6.vercel.app',
  'https://lost-link-three.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://localhost:5174'
].filter(Boolean).map(origin => origin.trim().replace(/\/$/, ''));

// Allow this project's Vercel production and deployment-preview domains.
// Vercel creates a unique hostname for each deployment, so exact matching
// alone can reject a valid preview URL after a new deployment.
const isLostLinkVercelOrigin = (origin) =>
  /^https:\/\/lost-link(?:-[a-z0-9-]+)?\.vercel\.app$/i.test(origin);

const corsOptions = {
  origin: (origin, callback) => {
    const normalizedOrigin = origin ? origin.replace(/\/$/, '') : origin;
    if (!normalizedOrigin || allowedOrigins.includes(normalizedOrigin) || isLostLinkVercelOrigin(normalizedOrigin)) {
      return callback(null, true);
    }
    console.log('Blocked by CORS:', normalizedOrigin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204
};

// Apply CORS before routes so both API calls and browser preflight requests
// receive the appropriate Access-Control headers.
app.use(cors(corsOptions));

app.use(express.json({ limit: '8mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging in development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
  });
}

// API Routes
app.use('/api/health', require('./routes/healthRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'LostLink API',
    tagline: 'Smart Lost and Found Platform',
    version: '1.0.0',
    documentation: {
      health: '/api/health',
      items: '/api/items',
      auth: '/api/auth',
    },
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`  LostLink Backend Server Running Successfully  `);
  console.log(`  PORT: http://localhost:${PORT}               `);
  console.log(`  MODE: ${process.env.NODE_ENV || 'development'} `);
  console.log(`===============================================`);
});

module.exports = app;
