<script lang="ts">
	import { onDestroy } from 'svelte';
	import { lastTaskId } from './index';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let result: number | string = '';
	let status: string = '';
	let polling: any;
	let loading = false;
	let unsub: () => void;
	let currentTaskId: string | null = null;

	async function fetchResult(taskId: string) {
		loading = true;
		try {
			const res = await fetch('http://localhost:3000/tasks');
			const data = await res.json();
			if (data.status === 'ok' && Array.isArray(data.tasks)) {
				const task = data.tasks.find((t: any) => t.id === taskId);
				if (task) {
					result = task.result;
					status = task.status;
				} else {
					result = '';
					status = '';
				}
			}
		} catch (e) {
			result = 'Error';
			status = 'failed';
		} finally {
			loading = false;
		}
	}

	function startPolling(taskId: string) {
		fetchResult(taskId);
		polling = setInterval(() => fetchResult(taskId), 1500);
	}

	function stopPolling() {
		if (polling) clearInterval(polling);
	}

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
