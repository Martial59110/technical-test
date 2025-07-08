import { describe, it, expect } from 'vitest';
import { isValidOperation, validateCompute } from '../../src/utils/validation';

describe('isValidOperation', () => {
  it('should return true for valid operations', () => {
    expect(isValidOperation('add')).toBe(true);
    expect(isValidOperation('substract')).toBe(true);
    expect(isValidOperation('multiply')).toBe(true);
    expect(isValidOperation('divide')).toBe(true);
  });

  it('should return false for invalid operations', () => {
    expect(isValidOperation('invalid')).toBe(false);
    expect(isValidOperation('hack')).toBe(false);
    expect(isValidOperation('')).toBe(false);
  });
});

describe('validateCompute', () => {
  it('should return true for valid compute objects', () => {
    expect(validateCompute({
      operation: 'add',
      operands: [5, 3]
    })).toBe(true);
  });

  it('should return false for invalid compute objects', () => {
    expect(validateCompute(null)).toBe(false);
    expect(validateCompute(undefined)).toBe(false);
    expect(validateCompute('not an object')).toBe(false);
    expect(validateCompute({ operation: 'add' })).toBe(false);
    expect(validateCompute({ operands: [5, 3] })).toBe(false);
    expect(validateCompute({ operation: 'add', operands: [5] })).toBe(false);
    expect(validateCompute({ operation: 'add', operands: [5, '3'] })).toBe(false);
    expect(validateCompute({ operation: 'substract', operands: [5, '3'] })).toBe(false);
    expect(validateCompute({ operation: 'multiply', operands: [5, '2'] })).toBe(false);
  });

  it('should return false for objects with wrong operand types', () => {
    expect(validateCompute({ operation: 'add', operands: ['5', 3] })).toBe(false);
    expect(validateCompute({ operation: 'substract', operands: [5, null] })).toBe(false);
    expect(validateCompute({ operation: 'multiply', operands: [undefined, 3] })).toBe(false);
    expect(validateCompute({ operation: 'divide', operands: [5, {}] })).toBe(false);
  });
});
