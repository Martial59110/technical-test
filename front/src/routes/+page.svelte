<script lang="ts">
	import Header from '../lib/Header.svelte';
	import CalculatorForm from '../lib/CalculatorForm.svelte';
	import CalculationResult from '../lib/CalculationResult.svelte';
	import CalculationHistory from '../lib/CalculationHistory.svelte';
</script>

<Header />

<main>
	<CalculatorForm />
	<CalculationResult />
	<CalculationHistory />
</main>
