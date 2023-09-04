import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { workoutRoutes } from './src/router/workoutRouter.js';
import { userRoutes } from './src/router/userRouter.js';

dotenv.config();

export const app = express();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: ['https://vercel.com', 'http://localhost:3000', 'https://github.com', 'https://www.google.com'],
    credentials: true,
  })
);
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use(process.env.WORKOUT_API, workoutRoutes);
app.use(process.env.USER_API, userRoutes);

// databases
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    // port
    app.listen(process.env.PORT, () => {
      console.log('connected to db & server running on port', process.env.PORT);
    });
  })
  .catch((error) => console.log(error));
