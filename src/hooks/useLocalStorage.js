import { useEffect, useState } from 'react';
import { readTasks, writeTasks } from '../utils/taskUtils.js';

export default function useLocalStorageTasks() {
  const [tasks, setTasks] = useState(readTasks);
  const [storageError, setStorageError] = useState('');

  useEffect(() => {
    try {
      writeTasks(tasks);
      setStorageError('');
    } catch (error) {
      console.error('Unable to save tasks.', error);
      setStorageError('Your changes could not be saved in this browser.');
    }
  }, [tasks]);

  return [tasks, setTasks, storageError];
}
