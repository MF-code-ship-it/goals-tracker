import React from "react";
import GoalItem from "./GoalItem";

export default function GoalList({ goals, onToggle, onDelete, onArchive, onUnArchive, showArchived, archivedView }) {
  return (
    <ol className="space-y-2">
      {goals.length === 0 && archivedView ? (
        <li className="text-gray-500 text-center italic">
          No Archived Goals
        </li>
      ) : (
        goals
          .filter(goal => (showArchived ? goal.archived : !goal.archived))
          .map(goal => (
            <GoalItem
              key={goal.id}
              goal={goal}
              onToggle={() => onToggle(goal.id)}
              onDelete={() => onDelete(goal.id)}
              onArchive={() => onArchive(goal.id)}
              onUnArchive={() => onUnArchive(goal.id)}
              archivedView={archivedView}
            />
          ))
      )}
    </ol>
  );
}