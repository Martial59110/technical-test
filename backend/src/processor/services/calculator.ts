import { Operands } from '../../shared/types';

export const operations: Operands = {
  addition: (operand1: number, operand2: number): number => operand1 + operand2
};

// Fonction pour effectuer un calcul
export function performCalculation(operation: string, operands: number[]): number {
  const operationFunction = operations[operation];
  
  if (!operationFunction) {
    throw new Error(`Unsupported operation: ${operation}`);
  }
  
  return operationFunction(operands[0], operands[1]);
}


