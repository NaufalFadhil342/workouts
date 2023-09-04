import { useAuth } from './useAuth';
import { useWorkouts } from './useWorkouts';

export const useSignout = () => {
  const { dispatch } = useAuth();
  const { dispatch: workoutsDispatch } = useWorkouts();

  const signout = () => {
    localStorage.removeItem('user');

    dispatch({ type: 'SIGNOUT' });
    workoutsDispatch({ type: 'SET_WORKOUTS', payload: null });
  };

  return { signout };
};
