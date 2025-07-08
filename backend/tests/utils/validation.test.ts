import { describe, it, expect } from 'vitest';
import { isValidOperation } from '../../src/utils/validation';

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
