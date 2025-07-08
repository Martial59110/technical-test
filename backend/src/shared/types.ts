
// Représente une opération mathématique à effectuer
export interface Compute {
  operation: string;
  operands: number[];
}

// Une tâche dans la file d'attente avec son statut et résultat
export interface Task {
  id: string;
  compute: Compute;
  result: number | string;
  status: "success" | "failed" | "pending";
}

// Collection des fonctions de calcul (add, substract, etc.)
export interface Operands {
  [key: string]: (operand1: number, operand2: number) => number;
}

// Les 4 calculs qu'on peut faire
export type OperationType = "add" | "substract" | "multiply" | "divide"; 