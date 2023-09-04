import { Router } from 'express';
import { createWorkout, getAllWorkouts, getWorkout, deleteWorkout, updateWorkout } from '../controllers/workoutController.js';
import requiredAuth from '../middleware/requiredAuth.js';

const router = Router();

// require auth for all workout routes
router.use(requiredAuth);

// GET all workouts
router.get('/', getAllWorkouts);

// GET a single workout
router.get('/:id', getWorkout);

// POST a new workout
router.post('/', createWorkout);

// DELETE a workout
router.delete('/:id', deleteWorkout);

// PUT a workout
router.put('/:id', updateWorkout);

export { router as workoutRoutes };
