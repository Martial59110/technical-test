<script lang="ts">
	import { onDestroy } from 'svelte';
	import { lastTaskId } from './index';
	import { onMount } from 'svelte';
	import { API_ENDPOINTS } from './config';

	/* Type pour une tâche de calcul, pour bien typer la récupération */
	type Task = {
		id: string;
		compute: {
			operation: string;
			operands: number[];
		};
		result: number | string;
		status: 'success' | 'failed' | 'pending';
	};

	/* Valeur du résultat affiché et statut de la tâche */
	let result: number | string = '';
	let status: string = '';
	let polling: ReturnType<typeof setInterval> | undefined;
	let loading = false;
	let unsub: () => void;
	let currentTaskId: string | null = null;

	/* Va chercher le résultat de la tâche côté backend, et met à jour l'affichage */
	async function fetchResult(taskId: string) {
		loading = true;
		try {
			const res = await fetch(API_ENDPOINTS.TASKS);
			const data = await res.json();
			if (data.status === 'ok' && Array.isArray(data.tasks)) {
				const task = (data.tasks as Task[]).find((t) => t.id === taskId);
				if (task) {
					result = task.result;
					status = task.status;
					if (status === 'success' || status === 'failed') {
						stopPolling();
					}
				} else {
					result = '';
					status = '';
				}
			}
		} catch {
			result = 'Error';
			status = 'failed';
		} finally {
			loading = false;
		}
	}

	/* Lance le polling pour aller chercher le résultat toutes les 1,5s */
	function startPolling(taskId: string) {
		fetchResult(taskId);
		polling = setInterval(() => fetchResult(taskId), 1500);
	}

	/* Arrête le polling si la tâche est terminée ou si on change de calcul */
	function stopPolling() {
		if (polling) clearInterval(polling);
	}

	/* À chaque fois qu'on soumet un nouveau calcul, on écoute l'id de la tâche et on lance le polling */
	onMount(() => {
		unsub = lastTaskId.subscribe((id) => {
			stopPolling();
			currentTaskId = id;
			result = '';
			status = '';
			if (id) {
				startPolling(id);
			}
		});
	});

	onDestroy(() => {
		stopPolling();
		if (unsub) unsub();
	});
</script>

<section class="mx-auto mb-8 max-w-md rounded-lg bg-white p-6 shadow">
	<h2 class="mb-4 text-xl font-semibold text-gray-800">Calculation Result</h2>
	<div class="flex h-20 items-center justify-center">
		{#if currentTaskId}
			{#if loading}
				<span class="text-gray-400">Loading...</span>
			{:else if status === 'success'}
				<span class="text-3xl font-bold text-gray-700">{result}</span>
			{:else if status === 'failed'}
				<span class="font-bold text-red-500">Error</span>
			{:else}
				<span class="text-gray-400">Pending...</span>
			{/if}
		{:else}
			<span class="text-gray-400">No calculation</span>
		{/if}
	</div>
</section>
