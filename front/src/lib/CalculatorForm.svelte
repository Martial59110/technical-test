<script lang="ts">
  import { lastTaskId } from './index';
  let operand1: number | '' = '';
  let operand2: number | '' = '';
  let operation: string = 'addition';
  let lastSubmitted: string = '';
  let isLoading = false;
  let message = '';

  // Mapping des opérations du front vers le backend
  const operationMap: Record<string, string> = {
    addition: 'addition',
    subtract: 'subtract',
    multiply: 'multiply',
    divide: 'divide',
  };

  function handleReset() {
    operand1 = '';
    operand2 = '';
    operation = 'addition';
    lastSubmitted = '';
    message = '';
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    lastSubmitted = `Calculation: ${operand1} ${operation} ${operand2}`;
    message = '';
    isLoading = true;
    try {
      const response = await fetch('http://localhost:3000/compute', {
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
        handleReset();
      } else {
        message = 'Error: ' + (data.error || 'Unknown error');
      }
    } catch (err) {
      message = 'Network error';
    } finally {
      isLoading = false;
    }
  }
</script>

<h1 class="text-4xl font-bold mb-2 text-center mt-8">Enter Calculation</h1>
<p class="mb-8 text-gray-600 text-center">Enter two operands and select an operator to calculate.</p>
<form on:reset|preventDefault={handleReset} on:submit={handleSubmit}
  class="bg-white rounded-xl shadow-lg p-10 w-full max-w-5xl mx-auto flex flex-col gap-8 mb-10">
  <div class="flex flex-col md:flex-row gap-8">
    <label class="flex-1">
      <span class="block mb-1 font-medium">Operand 1</span>
      <input type="number" name="operand1" bind:value={operand1}
        class="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-200" placeholder="Enter first number" />
    </label>
    <label class="flex-1">
      <span class="block mb-1 font-medium">Operand 2</span>
      <input type="number" name="operand2" bind:value={operand2}
        class="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-200" placeholder="Enter second number" />
    </label>
  </div>
  <div class="flex flex-col md:flex-row gap-8 items-center">
    <label class="w-full md:w-1/2">
      <span class="block mb-1 font-medium">Operator</span>
      <div class="flex flex-wrap gap-2">
        <select name="operation" bind:value={operation}
          class="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-200">
          <option value="addition">Addition (+)</option>
          <option value="subtract">Subtraction (-)</option>
          <option value="multiply">Multiplication (×)</option>
          <option value="divide">Division (÷)</option>
        </select>
      </div>
    </label>
    <div class="flex flex-col md:flex-row gap-4 w-full md:w-1/2 justify-end mt-4 md:mt-0">
      <button type="reset"
        class="px-8 py-2 border border-gray-400 rounded bg-white hover:bg-gray-100 font-semibold transition">Reset</button>
      <button type="submit"
        class="px-8 py-2 rounded bg-black text-white font-semibold hover:bg-gray-800 transition" disabled={isLoading}>
        {isLoading ? 'Calculating...' : 'Calculate'}
      </button>
    </div>
  </div>
</form>
{#if message}
  <div class="text-center text-green-600 mt-2">{message}</div>
{/if}
{#if lastSubmitted}
  <div class="text-center text-gray-600 mt-2">
    <strong>Last submitted:</strong> {lastSubmitted}
  </div>
{/if}