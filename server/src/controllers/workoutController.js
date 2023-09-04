import { WorkoutModel } from '../models/workout.js';
import mongoose from 'mongoose';

// Get all workouts
export const getAllWorkouts = async (req, res) => {
  const user_id = req.user._id;

  try {
    const workouts = await WorkoutModel.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single workout
export const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' });
  }

  const workout = await WorkoutModel.findById(id);

  if (!workout) {
    return res.status(400).json({ error: 'No such workout' });
  }

  res.status(200).json(workout);
};

// Create a new workout
export const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  const emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!load) {
    emptyFields.push('load');
  }
  if (!reps) {
    emptyFields.push('reps');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
  }

  try {
    const user_id = req.user._id;
    const workout = await WorkoutModel.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a workout
export const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' });
  }

  const workout = await WorkoutModel.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(400).json({ error: 'No such workout' });
  }

  res.status(200).json(workout);
};

// Update a workout

export const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' });
  }

  const workout = await WorkoutModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(400).json({ error: 'No such workout' });
  }

  res.status(200).json(workout);
};
