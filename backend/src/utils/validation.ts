import { Compute, OperationType } from '../shared/types';

// Vérifie si l'opération demandée est une des 4 autorisées donc add, substract, multiply, divide.

export function isValidOperation(operation: string): operation is OperationType {
  const validOperations: OperationType[] = ['add', 'substract', 'multiply', 'divide'];
  return validOperations.includes(operation as OperationType);
}

// On vérifie l'objet  (opération + 2 nombres)

export function validateCompute(compute: unknown): compute is Compute {
  if (!compute || typeof compute !== 'object' || compute === null) {
    return false;
  }
  
  const obj = compute as Record<string, unknown>;
  
  return (
    'operation' in obj &&
    'operands' in obj &&
    typeof obj.operation === 'string' &&
    Array.isArray(obj.operands) &&
    obj.operands.length === 2 &&
    obj.operands.every((op: unknown) => typeof op === 'number')
  );
}


