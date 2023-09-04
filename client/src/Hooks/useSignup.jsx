import { useState } from 'react';
import { useAuth } from './useAuth';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuth();

  const signUp = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    }

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json));
      dispatch({ type: 'SIGNIN', payload: json });
      alert('Successfully sign up, Go to sign in!');
      setIsLoading(false);
    }
  };

  return { signUp, isLoading, error };
};
