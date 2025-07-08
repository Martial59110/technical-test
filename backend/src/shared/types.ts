
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