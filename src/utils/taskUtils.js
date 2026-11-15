export const TASK_STATUSES = ['Todo', 'In Progress', 'Completed'];
export const TASK_PRIORITIES = ['Low', 'Medium', 'High'];
const STORAGE_KEY = 'taskflow-tasks';

function isTask(task) {
  return task
    && typeof task.id === 'string'
    && typeof task.title === 'string'
    && typeof task.description === 'string'
    && TASK_PRIORITIES.includes(task.priority)
    && TASK_STATUSES.includes(task.status)
    && typeof task.dueDate === 'string';
}

export function readTasks() {
  try {
    const savedTasks = window.localStorage.getItem(STORAGE_KEY);
    if (!savedTasks) return [];

    const parsedTasks = JSON.parse(savedTasks);
    return Array.isArray(parsedTasks) ? parsedTasks.filter(isTask) : [];
  } catch (error) {
    console.error('Unable to read saved tasks.', error);
    return [];
  }
}

export function writeTasks(tasks) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function createTaskId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function formatDueDate(date) {
  if (!date) return 'No due date';

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));
}
