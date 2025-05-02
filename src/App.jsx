import React, { useState, useEffect } from 'react';
import { saveGoals, loadGoals } from './utils/storage';
import GoalItem from './components/GoalItem';

export default function App() {
  const [goals, setGoals] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const stored = loadGoals();
    const upgraded = stored.map(goal =>
      typeof goal === 'string'
        ? { id: crypto.randomUUID(), text: goal, completed: false }
        : goal
    );
    setGoals(upgraded);
    saveGoals(upgraded);
  }, []);


  useEffect(() => {
    saveGoals(goals);
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


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow space-y-6">
        <h1 className="text-3xl font-extrabold text-center text-blue-600">Add Goal</h1>

        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter a goal..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addGoal()}
          />
          <button
            onClick={addGoal}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {goals.map(goal => (
            <GoalItem key={goal.id} goal={goal} toggleGoal={toggleGoal} />
          ))}
        </ul>
      </div>
    </div>
  );
}
