import GoalItem from './GoalItem';

export default function ArchivedGoals({ goals = [], onDelete }) {

    const archivedGoals = goals.filter(goal => goal.archived);

    return (
        <ol className="space-y-2">
            {archivedGoals.length === 0 ? (
                <li className="text-gray-500 text-center italic">
                    No Archived Goals
                </li>
            ) : (
                archivedGoals
                    .sort((a, b) => a.id - b.id)
                    .map(goal => (
                        <GoalItem
                            key={goal.id}
                            goal={goal}
                            onDelete={() => onDelete(goal.id)}
                            archivedView={true}>
                        </GoalItem>
                    ))
            )}
        </ol>
    );
}
