import { createContext, useReducer } from 'react';

export const WorkoutsCtx = createContext();

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload,
      };
    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const WorkoutsProvider = (props) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  return <WorkoutsCtx.Provider value={{ ...state, dispatch }}>{props.children}</WorkoutsCtx.Provider>;
};
