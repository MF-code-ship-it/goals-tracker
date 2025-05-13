import { useState } from 'react';
import { useGoals } from './hooks/useGoals';
import AddGoalForm from './components/AddGoalForm';
import GoalList from './components/GoalList';
import Header from './components/Header';

export default function App() {
  const {goals, dispatch} = useGoals();
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState('Goals');
  const envLabel = import.meta.env.VITE_ENV_LABEL;

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
              <AddGoalForm
                input={input}
                setInput={setInput}
                onAdd={addGoal}
              />
              <GoalList
                goals={goals}
                onToggle={id => dispatch({ type: 'TOGGLE', payload: id })}
                onDelete={id => dispatch({ type: 'DELETE', payload: id })}
                onArchive={id => dispatch({ type: 'ARCHIVE', payload: id })}
                showArchived={false}
              />
            </>
          )}

          {activeTab === 'Archived' && (
            <GoalList
              goals={goals.filter(goal => goal.archived)}
              onDelete={id => dispatch({ type: 'DELETE', payload: id })}
              onUnArchive={id => dispatch({ type: 'UNARCHIVE', payload: id })}
              showArchived={true}
              archivedView={true}
            />
          )}
        </div>
      </main>
    </div>
  );
}