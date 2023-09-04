import React, { useState } from 'react';
import '../Styles/form.css';
import { useWorkouts } from '../Hooks/useWorkouts';
import { useAuth } from '../Hooks/useAuth';

const WorkoutForm = () => {
  const { dispatch } = useWorkouts();
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuth();

  const formHandler = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be signed in');
      return;
    }

    const workout = { title, load, reps };

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle('');
      setLoad('');
      setReps('');
      setError(null);
      setEmptyFields([]);
      alert('New workout is added');
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={formHandler}>
      <h3>Add a New Workout</h3>
      <div className="controls">
        <label>Exercise Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className={emptyFields.includes('title') ? 'error' : ''}
        />
        <label>Load (Kg):</label>
        <input
          type="number"
          value={load}
          onChange={(e) => {
            setLoad(e.target.value);
          }}
          className={emptyFields.includes('load') ? 'error' : ''}
        />
        <label>Reps:</label>
        <input
          type="number"
          value={reps}
          onChange={(e) => {
            setReps(e.target.value);
          }}
          className={emptyFields.includes('reps') ? 'error' : ''}
        />
      </div>
      <button>Create Workout</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default WorkoutForm;
