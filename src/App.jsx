import React from 'react';
import { useState, useEffect } from 'react';
import { saveGoals, loadGoals } from './utils/storage';

export default function App() {
  const [goals, setGoals] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    setGoals(loadGoals());
  }, []);

  useEffect(() => {
    saveGoals(goals);
  }, [goals]);

  const addGoal = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setGoals([...goals, trimmed]);
    setInput('');
  };
  // trigger Tailwind to include these classes: text-green-600 text-blue-600 bg-white

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow space-y-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
          Add Goal
        </h1>
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
          {goals.map((goal, idx) => (
            <li
              key={idx}
              className="bg-gray-50 border border-gray-200 rounded-md px-4 py-2 shadow-sm text-gray-800"
            >
              {goal}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}