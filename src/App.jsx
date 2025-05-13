import React, { useReducer, useState, useEffect, useRef } from 'react';
import { saveGoals, loadGoals } from './utils/storage';
import GoalItem from './components/GoalItem';
import ArchivedGoals from './components/ArchivedGoals';
import AddGoalForm from './components/AddGoalForm';
import Header from './components/Header';

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

export default function App() {
  const [goals, dispatch] = useReducer(goalsReducer, initialState);
  const [input, setInput] = useState('');
  const hasMounted = useRef(false);
  const [activeTab, setActiveTab] = useState('Goals');
  const envLabel = import.meta.env.VITE_ENV_LABEL;

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

  const addGoal = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const newGoal = {
      id: Date.now(),
      text: trimmed,
      completed: false,
      archived: false,
    };
    dispatch({ type: 'ADD', payload: newGoal });
    setInput('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow space-y-6">
          <h1 className="text-3xl font-extrabold text-center text-blue-600">
            {activeTab === 'Goals' ? envLabel : 'Archived'}
          </h1>

          {activeTab === 'Goals' && (
            <>
              <AddGoalForm input={input} setInput={setInput} onAdd={addGoal} />
              <ol className="space-y-2">
                {goals
                  .filter(goal => !goal.archived)
                  .map(goal => (
                      <GoalItem
                        key={goal.id}
                        goal={goal}
                        toggleGoal={() => dispatch({ type: 'TOGGLE', payload: goal.id })}
                        onDelete={() => dispatch({ type: 'DELETE', payload: goal.id })}
                        onArchive={() => dispatch({ type: 'ARCHIVE', payload: goal.id })} 
                        />
                  ))}
              </ol>
            </>
          )}

          {activeTab === 'Archived' && (
            <ArchivedGoals
              goals={goals}
              onDelete={id => dispatch({ type: 'DELETE', payload: id })}
              onUnArchive={id => dispatch({ type: 'UNARCHIVE', payload: id })}
            />
          )}
        </div>
      </main>
    </div>
  );
}