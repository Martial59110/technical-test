<script lang="ts">
  import { onMount } from 'svelte';

  type Task = {
    id: string;
    compute: {
      operation: string;
      operands: number[];
    };
    result: number | string;
    status: 'success' | 'failed' | 'pending';
  };

  let tasks: Task[] = [];
  let isLoading = true;
  let error = '';

  onMount(async () => {
    try {
      const res = await fetch('http://localhost:3000/tasks');
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      tasks = data.tasks || [];
    } catch (e) {
      error = 'Could not load history';
    } finally {
      isLoading = false;
    }
  });

  function getOperationString(op: string) {
    switch (op) {
      case 'addition': return '+';
      case 'subtract': return '-';
      case 'multiply': return '×';
      case 'divide': return '÷';
      default: return op;
    }
  }
</script>

<section class="px-6 py-10 bg-white">
  <div class="flex flex-col md:flex-row md:items-start md:gap-8 max-w-5xl mx-auto">
    <div class="md:w-1/3 mb-6 md:mb-0">
      <h2 class="text-2xl font-semibold mb-2">History of Calculations</h2>
      <p class="text-gray-600">See all your past calculations and results.</p>
    </div>
    <div class="md:w-2/3 w-full">
      {#if isLoading}
        <div class="text-gray-500">Loading...</div>
      {:else if error}
        <div class="text-red-500">{error}</div>
      {:else if tasks.length === 0}
        <div class="text-gray-500">No calculations yet.</div>
      {:else}
        <ul class="space-y-4">
          {#each tasks as task, i}
            <li class="flex items-center justify-between bg-gray-50 p-4 rounded-xl shadow-sm">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span class="text-xl">🧮</span>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Calculation {i + 1}</p>
                  <p class="font-medium text-base">
                    {task.compute.operands[0]} {getOperationString(task.compute.operation)} {task.compute.operands[1]}
                  </p>
                </div>
              </div>
              <div class="text-right min-w-[70px]">
                <p class="text-gray-500 text-sm">Result:</p>
                <p class="font-bold text-lg">{task.result}</p>
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</section>
