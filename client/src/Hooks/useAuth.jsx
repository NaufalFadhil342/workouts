import { useContext } from 'react';
import { AuthContext } from '../Context/authCtx';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error('useAuth must be used inside a AuthProvider!');
  }

  return context;
};
