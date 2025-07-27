<script lang="ts">
	import { lastTaskId } from './index';
	import { fetchTasks } from './historyStore';
	import { API_ENDPOINTS } from './config';

	/* Champs contrôlés du formulaire (valeurs des inputs) */
	let operand1: number | '' = '';
	let operand2: number | '' = '';
	let operation: string = 'addition';
	let lastSubmitted: string = '';
	let isLoading = false;
	let message = '';

	/* Petite table de correspondance pour envoyer le bon nom d'opération au backend */
	const operationMap: Record<string, string> = {
		addition: 'addition',
		subtract: 'subtract',
		multiply: 'multiply',
		divide: 'divide'
	};

	/* Remet tout à zéro quand on clique sur reset */
	function handleReset() {
		operand1 = '';
		operand2 = '';
		operation = 'addition';
		lastSubmitted = '';
		message = '';
	}

	/* Quand on soumet le formulaire, on envoie la requête au backend et on gère la réponse */
	async function handleSubmit(event: Event) {
		event.preventDefault();
		lastSubmitted = `Calculation: ${operand1} ${operation} ${operand2}`;
		message = '';
		isLoading = true;
		try {
			const response = await fetch(API_ENDPOINTS.COMPUTE, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					operation: operationMap[operation],
					operands: [Number(operand1), Number(operand2)]
				})
			});
			const data = await response.json();
			if (data.status === 'ok' && data.id) {
				lastTaskId.set(data.id);
				message = 'Calculation sent!';

				setTimeout(() => {
					fetchTasks();
				}, 100);
			} else {
				message = 'Error: ' + (data.error || 'Unknown error');
			}
		} catch {
			message = 'Network error';
		} finally {
			isLoading = false;
		}
	}
</script>

<h1 class="mt-8 mb-2 text-center text-4xl font-bold">Enter Calculation</h1>
<p class="mb-8 text-center text-gray-600">
	Enter two operands and select an operator to calculate.
</p>
<form
	on:reset|preventDefault={handleReset}
	on:submit={handleSubmit}
	class="mx-auto mb-10 flex w-full max-w-5xl flex-col gap-8 rounded-xl bg-white p-10 shadow-lg"
>
	<div class="flex flex-col gap-8 md:flex-row">
		<label class="flex-1">
			<span class="mb-1 block font-medium">Operand 1</span>
			<input
				type="number"
				name="operand1"
				bind:value={operand1}
				class="w-full rounded border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-green-200 focus:outline-none"
				placeholder="Enter first number"
			/>
		</label>
		<label class="flex-1">
			<span class="mb-1 block font-medium">Operand 2</span>
			<input
				type="number"
				name="operand2"
				bind:value={operand2}
				class="w-full rounded border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-green-200 focus:outline-none"
				placeholder="Enter second number"
			/>
		</label>
	</div>
	<div class="flex flex-col items-center gap-8 md:flex-row">
		<label class="w-full md:w-1/2">
			<span class="mb-1 block font-medium">Operator</span>
			<div class="flex flex-wrap gap-2">
				<select
					name="operation"
					bind:value={operation}
					class="w-full rounded border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-green-200 focus:outline-none"
				>
					<option value="addition">Addition (+)</option>
					<option value="subtract">Subtraction (-)</option>
					<option value="multiply">Multiplication (×)</option>
					<option value="divide">Division (÷)</option>
				</select>
			</div>
		</label>
		<div class="mt-4 flex w-full flex-col justify-end gap-4 md:mt-0 md:w-1/2 md:flex-row">
			<button
				type="reset"
				class="rounded border border-gray-400 bg-white px-8 py-2 font-semibold transition hover:bg-gray-100"
				>Reset</button
			>
			<button
				type="submit"
				class="rounded bg-black px-8 py-2 font-semibold text-white transition hover:bg-gray-800"
				disabled={isLoading}
			>
				{isLoading ? 'Calculating...' : 'Calculate'}
			</button>
		</div>
	</div>
</form>
{#if message}
	<div class="mt-2 text-center text-green-600">{message}</div>
{/if}
{#if lastSubmitted}
	<div class="mt-2 text-center text-gray-600">
		<strong>Last submitted:</strong>
		{lastSubmitted}
	</div>
{/if}
