<script lang="ts">
	import { onMount } from 'svelte';
	import { tasks, isLoadingTasks, errorTasks, fetchTasks } from './historyStore';

	$: sortedTasks = $tasks.slice().sort((a, b) => {
		if (!a.createdAt || !b.createdAt) return 0;
		return b.createdAt.localeCompare(a.createdAt);
	});

	async function clearHistory() {
		isLoadingTasks.set(true);
		errorTasks.set('');
		try {
			const res = await fetch('http://localhost:3000/tasks', { method: 'DELETE' });
			if (!res.ok) throw new Error('Failed to clear history');
			await fetchTasks();
		} catch {
			errorTasks.set('Could not clear history');
		} finally {
			isLoadingTasks.set(false);
		}
	}

	onMount(() => {
		fetchTasks();
	});

	function getOperationString(op: string) {
		switch (op) {
			case 'addition':
				return '+';
			case 'subtract':
				return '-';
			case 'multiply':
				return '×';
			case 'divide':
				return '÷';
			default:
				return op;
		}
	}
</script>

<section class="bg-white px-6 py-10">
	<div class="mx-auto flex max-w-5xl flex-col md:flex-row md:items-start md:gap-8">
		<div class="mb-6 flex flex-col gap-2 md:mb-0 md:w-1/3">
			<div class="flex items-center justify-between">
				<h2 class="mb-2 text-2xl font-semibold">History of Calculations</h2>
				<button
					on:click={clearHistory}
					class="ml-2 rounded bg-red-100 px-3 py-1 text-sm font-semibold text-red-700 hover:bg-red-200"
					>Clear history</button
				>
			</div>
			<p class="text-gray-600">See all your past calculations and results.</p>
		</div>
		<div class="w-full md:w-2/3">
			{#if $isLoadingTasks}
				<div class="text-gray-500">Loading...</div>
			{:else if $errorTasks}
				<div class="text-red-500">{$errorTasks}</div>
			{:else if sortedTasks.length === 0}
				<div class="text-gray-500">No calculations yet.</div>
			{:else}
				<ul class="space-y-4">
					{#each sortedTasks as task, i (task.id)}
						<li class="flex items-center justify-between rounded-xl bg-gray-50 p-4 shadow-sm">
							<div class="flex items-center gap-4">
								<div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
									<span class="text-xl">🧮</span>
								</div>
								<div>
									<p class="text-sm text-gray-500">Calculation {i + 1}</p>
									<p class="text-base font-medium">
										{task.compute.operands[0]}
										{getOperationString(task.compute.operation)}
										{task.compute.operands[1]}
									</p>
								</div>
							</div>
							<div class="min-w-[70px] text-right">
								<p class="text-sm text-gray-500">Result:</p>
								<p class="text-lg font-bold">{task.result}</p>
							</div>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</section>
