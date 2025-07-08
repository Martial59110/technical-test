
export interface Compute {
  operation: string;
  operands: number[];
}

export interface Task {
  id: string;
  compute: Compute;
  result: number | string;
  status: "success" | "failed" | "pending";
}

export interface Operands {
  [key: string]: (operand1: number, operand2: number) => number;
}

export type OperationType = "add" | "substract" | "multiply" | "divide"; 