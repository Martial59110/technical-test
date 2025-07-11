<script lang="ts">
  let operand1: number | '' = '';
  let operand2: number | '' = '';
  let operation: string = 'addition';
  let lastSubmitted: string = '';

  function handleReset() {
    operand1 = '';
    operand2 = '';
    operation = 'addition';
    lastSubmitted = '';
  }

  function handleSubmit(event: Event) {
    event.preventDefault();
    lastSubmitted = `Calculation: ${operand1} ${operation} ${operand2}`;
  }
</script>

<form on:reset|preventDefault={handleReset} on:submit={handleSubmit}
  class="bg-white rounded-lg shadow p-6 max-w-xl mx-auto flex flex-col gap-4 mb-8">
  <div class="flex flex-col md:flex-row gap-4">
    <label class="flex-1">
      <span class="block mb-1 font-medium">Operand 1</span>
      <input type="number" name="operand1" bind:value={operand1}
        class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200" />
    </label>
    <label class="flex-1">
      <span class="block mb-1 font-medium">Operand 2</span>
      <input type="number" name="operand2" bind:value={operand2}
        class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200" />
    </label>
  </div>
  <label>
    <span class="block mb-1 font-medium">Operator</span>
    <select name="operation" bind:value={operation}
      class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200">
      <option value="addition">Addition (+)</option>
      <option value="subtract">Subtraction (-)</option>
      <option value="multiply">Multiplication (×)</option>
      <option value="divide">Division (÷)</option>
    </select>
  </label>
  <div class="flex gap-4 justify-end mt-2">
    <button type="reset"
      class="px-4 py-2 border border-gray-400 rounded bg-white hover:bg-gray-100 transition">Reset</button>
    <button type="submit"
      class="px-4 py-2 rounded bg-black text-white font-semibold hover:bg-gray-800 transition">Calculate</button>
  </div>
</form>
{#if lastSubmitted}
  <div class="text-center text-gray-600 mt-2">
    <strong>Last submitted:</strong> {lastSubmitted}
  </div>
{/if}