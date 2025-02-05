import { Label } from './label';

export interface Issue {
  id: number;
  title: string;
  assignee_ids: number[];
  assignee_id: number | null;
  author_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
  position: number;
  branch_name: string | null;
  description: string;
  milestone_id: number | null;
  state: string;
  iid: number;
  labels: Label[];
}
