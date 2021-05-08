export function speeder(theFunctions: Function | Function[], options?: {
  names?: string | string[];
  error?: boolean;
  input?: object[];
  multipleInputs?: boolean | boolean[];
  variableInput?: boolean;
  raw?: boolean;
  counts?: number;
  errorOutAfter?: number | number[];
  verbose?: boolean;
}): Promise<{
  min: number;
  max: number;
  mean: number;
  median: number;
  variance: number;
  std: number;
  counts: number;
  name: string;
}>;
