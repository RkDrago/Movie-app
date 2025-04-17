// server.js
import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute.js';
import movieRoute from './routes/movieRoute.js';
import dotenv from 'dotenv';
dotenv.config()

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

async function startServer() {
  try {
    await app.prepare();

    const server = express();

    // Middleware
    server.use(bodyParser.json());

    //Using the Imported Routes
    server.use('/api/users', userRoute);
    server.use('/api/movies', movieRoute);

    // handles sleep
   server.get('/ping', (req, res) => {
      res.send('pong');
    });

    // Handle Next.js pages
    server.use((req, res) => {
      return handle(req, res);
    });

    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });

  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

startServer();
