import React, { useEffect } from 'react';
import '../Styles/home.css';

import { useWorkouts } from '../Hooks/useWorkouts';
import { WorkoutDetails } from '../Layouts/workoutDetails';
import WorkoutForm from '../Components/form';
import { useAuth } from '../Hooks/useAuth';

const Home = () => {
  const { workouts, dispatch } = useWorkouts();
  const { user } = useAuth();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  const workoutDetailStyling = {
    width: 'fit-content',
    margin: 'auto',
    fontSize: '18px',
    color: '#54b435',
  };

  const WorkoutDetail = () => {
    if (!workouts || workouts.length === 0) {
      return <p style={workoutDetailStyling}>No Workout Available.</p>;
    }

    return workouts.map((workout) => <WorkoutDetails key={workout._id} workout={workout} />);
  };

  return (
    <div className="home">
      <div className="workout">
        <WorkoutDetail />
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
