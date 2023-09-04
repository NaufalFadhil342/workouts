import { useContext } from 'react';
import { WorkoutsCtx } from '../Context/workoutCtx';

export const useWorkouts = () => {
  const context = useContext(WorkoutsCtx);

  if (!context) {
    throw Error('useWorkouts must be used inside a WorkoutsProvider!');
  }

  return context;
};
