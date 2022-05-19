import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDb from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import colisRoutes from './routes/colisRoutes.js';
import lettreRoutes from './routes/lettreRoutes.js';
import rapidPostRoutes from './routes/rapidPostRoutes.js';
import reclamationRoutes from './routes/reclamationRoutes.js';
import stripeRoutes from './routes/stripeRoutes.js';
import { errorHandler, notFound } from './middleware/error.js';
import cors from 'cors';

connectDb();
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/users', userRoutes);
app.use('/api/colis', colisRoutes);
app.use('/api/lettres', lettreRoutes);
app.use('/api/rapidPosts', rapidPostRoutes);
app.use('/api/reclamation', reclamationRoutes);
app.use('/api/stripe', stripeRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Connected on port ${PORT}`));
