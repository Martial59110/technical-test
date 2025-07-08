import { describe, it, expect } from 'vitest';
import type { Compute, Task, Operands, OperationType } from '../../src/shared/types';

describe('TypeScript Types', () => {
  it('should allow valid Compute objects', () => {
    const validCompute: Compute = {
      operation: 'add',
      operands: [5, 3]
    };
    
    expect(validCompute.operation).toBe('add');
    expect(validCompute.operands).toEqual([5, 3]);
  });

  it('should allow valid OperationType values', () => {
    const validOperations: OperationType[] = ['add', 'substract', 'multiply', 'divide'];
    
    expect(validOperations).toContain('add');
    expect(validOperations).toContain('substract');
    expect(validOperations).toContain('multiply');
    expect(validOperations).toContain('divide');
  });
});
