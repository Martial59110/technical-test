import { Operands } from '../../shared/types';

export const operations: Operands = {
  addition: (operand1: number, operand2: number): number => operand1 + operand2,
  subtract: (operand1: number, operand2: number): number => operand1 - operand2,
  multiply: (operand1: number, operand2: number): number => operand1 * operand2,
  divide: (operand1: number, operand2: number): number => {
    if (operand2 === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return operand1 / operand2;
  }
};


export function performCalculation(operation: string, operands: number[]): number {
  const operationFunction = operations[operation];
  if (!operationFunction) {
    throw new Error(`Unsupported operation: ${operation}`);
  }
  
  return operationFunction(operands[0], operands[1]);
}


