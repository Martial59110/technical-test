<script lang="ts">
  import CalculatorForm from '../lib/CalculatorForm.svelte';
  import CalculationResult from '../lib/CalculationResult.svelte';
  import CalculationHistory from '../lib/CalculationHistory.svelte';
</script>

<header class="bg-green-100 py-6 mb-8 shadow">
  <h1 class="text-3xl font-bold text-center text-gray-800">Calculator App</h1>
</header>

<main>
  <CalculatorForm />
  <CalculationResult />
  <CalculationHistory />
</main>
