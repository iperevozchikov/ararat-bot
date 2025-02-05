export interface MergeRequest {
  id: number;
  iid: number;
  title: string;
  source_branch: string;
  source_project_id: number;
  target_branch: string;
  target_project_id: number;
  state: string;
  merge_status: string;
  detailed_merge_status: string;
  url: string;
}
