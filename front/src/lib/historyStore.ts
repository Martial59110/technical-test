import { writable } from 'svelte/store';

export type Task = {
  id: string;
  compute: {
    operation: string;
    operands: number[];
  };
  result: number | string;
  status: 'success' | 'failed' | 'pending';
  createdAt?: string;
};

export const tasks = writable<Task[]>([]);
export const isLoadingTasks = writable<boolean>(true);
export const errorTasks = writable<string>('');

export async function fetchTasks() {
  isLoadingTasks.set(true);
  errorTasks.set('');
  try {
    const res = await fetch('http://localhost:3000/tasks');
    if (!res.ok) throw new Error('Failed to fetch tasks');
    const data = await res.json();
    tasks.set(data.tasks || []);
  } catch {
    errorTasks.set('Could not load history');
  } finally {
    isLoadingTasks.set(false);
  }
} 