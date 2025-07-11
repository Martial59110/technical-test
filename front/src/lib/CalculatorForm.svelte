<script lang="ts">
  let operand1: number | '' = '';
  let operand2: number | '' = '';
  let operation: string = 'addition';

  function handleReset() {
    operand1 = '';
    operand2 = '';
    operation = 'addition';
  }
</script>

<form on:reset|preventDefault={handleReset}>
  <label>
    Operand 1
    <input type="number" name="operand1" bind:value={operand1} />
  </label>
  <label>
    Operand 2
    <input type="number" name="operand2" bind:value={operand2} />
  </label>
  <label>
    Operator
    <select name="operation" bind:value={operation}>
      <option value="addition">Addition (+)</option>
      <option value="subtract">Subtraction (-)</option>
      <option value="multiply">Multiplication (×)</option>
      <option value="divide">Division (÷)</option>
    </select>
  </label>
  <button type="reset">Reset</button>
  <button type="submit">Calculate</button>
</form>
<div style="margin-top:1em;">
  <strong>Current values:</strong><br>
  Operand 1: {operand1}<br>
  Operand 2: {operand2}<br>
  Operation: {operation}
</div> 