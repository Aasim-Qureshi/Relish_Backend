const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const connectDB = require('./infrastructure/db/connect');
const appRouter = require('./presentation/routes/index.routes'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: ['http://localhost:5173', 'https://relish-frontend-zeta.vercel.app', 'https://relish-frontend-aasim-qureshis-projects.vercel.app', 'https://relish-frontend-git-main-aasim-qureshis-projects.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/', appRouter); 

const startServer = async () => {
  try {
    await connectDB(); 

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();
