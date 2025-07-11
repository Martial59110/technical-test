<script lang="ts">
  import CalculatorForm from '../lib/CalculatorForm.svelte';
  import CalculationResult from '../lib/CalculationResult.svelte';
  import CalculationHistory from '../lib/CalculationHistory.svelte';
</script>

<header>
  <h1>Calculator App</h1>
</header>

<main>
 
  <CalculatorForm />
  <CalculationResult />
  <CalculationHistory />
</main>
