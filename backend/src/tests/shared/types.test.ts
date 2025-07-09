import { describe, it, expect } from 'vitest';
import type { Compute, OperationType } from '../../shared/types';

describe('TypeScript Types', () => {
  it('should allow valid Compute objects', () => {
    const validCompute: Compute = {
      operation: 'addition',
      operands: [5, 3]
    };
    
    expect(validCompute.operation).toBe('addition');
    expect(validCompute.operands).toEqual([5, 3]);
  });

  it('should allow valid OperationType values', () => {
    const validOperations: OperationType[] = ['addition', 'subtract', 'multiply', 'divide'];
    
    expect(validOperations).toContain('addition');
    expect(validOperations).toContain('subtract');
    expect(validOperations).toContain('multiply');
    expect(validOperations).toContain('divide');
  });
});
