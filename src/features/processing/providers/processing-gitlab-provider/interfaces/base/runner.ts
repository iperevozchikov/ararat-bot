export interface Runner {
  id: number;
  description: string;
  active: boolean;
  runner_type: string;
  is_shared: boolean;
  tags: string[];
}
