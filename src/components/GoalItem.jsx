import React from 'react';

export default function GoalItem({ goal, toggleGoal, onDelete }) {
    return (
        <li className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-md px-4 py-2 shadow-sm">
            <span className={`${goal.completed ? 'text-red-500 line-through' : 'text-gray-800'}`}>
                {goal.text}
            </span>
            <div className="flex gap-2">
                <button onClick={() => toggleGoal(goal.id)}
                    className={`ml-4 px-2 py-1 text-sm border rounded ${goal.completed
                        ? 'text-green-600 border-green-600 bg-green-100 hover:bg-green-200'
                        : 'text-blue-600 border-blue-600 bg-blue-100 hover:bg-blue-200'
                        }`}
                >
                    {goal.completed ? 'Undo' : 'Complete'}
                </button>

                <button
                    onClick={onDelete}
                    className="text-red-600 border border-red-600 bg-red-100 hover:bg-red-200 text-sm px-2 py-1 roudned transition"
                >
                    Delete
                </button>
            </div>
        </li >
    );
}