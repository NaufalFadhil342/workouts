import React, { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useWorkouts } from '../Hooks/useWorkouts';
import { useAuth } from '../Hooks/useAuth';

export const WorkoutDetails = ({ workout }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const { dispatch } = useWorkouts();
  const { user } = useAuth();

  const deletedHandler = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const json = await response.json();

    try {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="workout-details">
      <div className="details">
        <h3>{workout.title}</h3>
        <div className="desc">
          <p>
            <strong>Load (Kg):</strong> {workout.load}
          </p>
          <p>
            <strong>Reps:</strong> {workout.reps}
          </p>
          <p className="date">{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
        </div>
      </div>
      <div className="delete" onMouseEnter={() => setIsDeleted(true)} onMouseLeave={() => setIsDeleted(false)}>
        {isDeleted && (
          <span onClick={deletedHandler}>
            <AiOutlineCloseCircle />
          </span>
        )}
      </div>
    </div>
  );
};
