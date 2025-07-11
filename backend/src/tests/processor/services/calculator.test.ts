import { describe, it, expect } from 'vitest';
import { operations, performCalculation } from '../../../processor/services/calculator';

describe('Calculator Service', () => {
  describe('operations', () => {
    it('should have all required operations', () => {
      expect(operations).toHaveProperty('addition');
      expect(operations).toHaveProperty('subtract');
      expect(operations).toHaveProperty('multiply');
      expect(operations).toHaveProperty('divide');
    });
  });

  describe('performCalculation', () => {
    it('should perform addition correctly', () => {
      const result = performCalculation('addition', [5, 3]);
      expect(result).toBe(8);
    });
    it('should perform subtraction correctly', () => {
        const result = performCalculation('subtract', [10, 4]);
        expect(result).toBe(6);
      });
    it('should perform multiplication correctly', () => {
        const result = performCalculation('multiply', [6, 7]);
        expect(result).toBe(42);
      });

  
 
  });
}); 