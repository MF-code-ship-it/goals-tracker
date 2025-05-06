import React, { useState, useEffect, useRef } from 'react';
import { saveGoals, loadGoals } from './utils/storage';
import GoalItem from './components/GoalItem';
import AddGoalForm from './components/AddGoalForm';

export default function App() {
  const [goals, setGoals] = useState([]);
  const [input, setInput] = useState('');
  const hasMounted = useRef(false);

  useEffect(() => {
    const stored = loadGoals();
    const upgraded = stored.map(goal =>
      typeof goal === 'string'
        ? { id: crypto.randomUUID(), text: goal, completed: false }
        : goal
    );
    setGoals(upgraded);
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
    }
    setGoals([...goals, newGoal]);
    setInput('');
  };

  const toggleGoal = (id) => {
    console.log('Toggling goal with id:', id);
    console.log('Goals state:', goals);

    const index = goals.findIndex(g => g.id === id);
    if (index === -1) {
      console.error('Goal not found for id:', id);
      return;
    }

    const updated = [...goals];
    updated[index].completed = !updated[index].completed;
    setGoals(updated);
  };

  const deleteGoal = (id) => {
    const updated = goals.filter(goal => goal.id !== id);
    setGoals(updated);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow space-y-6">
        <h1 className="text-3xl font-extrabold text-center text-blue-600">Add Goal</h1>

        <AddGoalForm input={input} setInput={setInput} onAdd={addGoal} />

        <ul className="space-y-2">
          {goals.map(goal => (
            <GoalItem key={goal.id} goal={goal} toggleGoal={() => toggleGoal(goal.id)} onDelete={() => deleteGoal(goal.id)} />
          ))}
        </ul>
      </div>
    </div>
  );
}
