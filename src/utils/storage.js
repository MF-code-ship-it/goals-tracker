const STORAGE_KEY = 'goals-tracker-data';

export const saveGoals = (goals) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
};

export const loadGoals = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};
