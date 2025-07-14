
/**
 * Définit tous les types TypeScript partagés entre les différents modules du backend.
 * - Compute : structure d'une opération mathématique à effectuer.
 * - Task : structure d'une tâche dans la file d'attente (avec statut, résultat, date, etc.).
 * - Operands : dictionnaire des fonctions de calcul disponibles.
 * - OperationType : liste des opérations supportées.
 * 
 * Permet d'assurer la cohérence des données et de faciliter l'autocomplétion/validation dans tout le projet.
 */


export interface Compute {
  operation: string;
  operands: number[];
}


export interface Task {
  id: string;
  compute: Compute;
  result: number | string;
  status: "success" | "failed" | "pending";
  createdAt: string;
}

export interface Operands {
  [key: string]: (operand1: number, operand2: number) => number;
}

export type OperationType = "addition" | "subtract" | "multiply" | "divide"; 