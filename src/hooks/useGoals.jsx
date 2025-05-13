import { useEffect, useReducer, useRef } from 'react';
import { saveGoals, loadGoals } from '../utils/storage'


const initialState = [];
function goalsReducer(state, action) {
  switch (action.type) {
    case 'LOAD':
      return action.payload;
    case 'ADD':
      return [...state, action.payload];
    case 'TOGGLE':
      return state.map(goal =>
        goal.id === action.payload ? { ...goal, completed: !goal.completed } : goal
      );
    case 'DELETE':
      return state.filter(goal => goal.id !== action.payload);
    case 'ARCHIVE':
      return state.map(goal =>
        goal.id === action.payload ? { ...goal, archived: true } : goal
      );
    case 'UNARCHIVE':
      return state.map(goal =>
        goal.id === action.payload ? { ...goal, archived: false } : goal
      );
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export function useGoals() {
  const [goals, dispatch] = useReducer(goalsReducer, initialState);
  const hasMounted = useRef(false);

  useEffect(() => {
    const stored = loadGoals();
    const upgraded = stored.map(goal =>
      typeof goal === 'string'
        ? { id: crypto.randomUUID(), text: goal, completed: false, archived: true }
        : goal
    );
    dispatch({ type: 'LOAD', payload: upgraded });
    if (stored.some(g => typeof g === 'string')) {
      saveGoals(upgraded);
    }
  }, []);

  useEffect(() => {
    if (hasMounted.current) {
      saveGoals(goals);
    } else {
      hasMounted.current = true;
    }
  }, [goals]);

  return { goals, dispatch };
}