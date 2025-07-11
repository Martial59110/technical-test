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
}); 