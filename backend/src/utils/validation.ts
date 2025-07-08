import { Compute, OperationType } from '../shared/types';


export function isValidOperation(operation: string): operation is OperationType {
  const validOperations: OperationType[] = ['add', 'substract', 'multiply', 'divide'];
  return validOperations.includes(operation as OperationType);
}


