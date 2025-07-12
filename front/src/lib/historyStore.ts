/*
  Ce fichier centralise la gestion de l'historique des tâches de calcul.
  On y trouve :
  - Le type Task pour bien typer les données récupérées du backend.
  - Un store Svelte (tasks) qui contient la liste des tâches, et deux autres pour l'état de chargement et les erreurs.
  - La fonction fetchTasks() qui va chercher l'historique auprès du backend et met à jour les stores.
  L'idée, c'est que tous les composants qui ont besoin de l'historique (formulaire, historique, etc.) utilisent ce store,
  ce qui évite de dupliquer la logique de récupération et permet de garder l'UI à jour facilement.
*/

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
