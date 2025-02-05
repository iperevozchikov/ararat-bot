import { Event } from './base/event';
import { User } from './base/user';
import { Project } from './base/project';
import { Repository } from './base/repository';
import { Label } from './base/label';
import { Commit } from './base/commit';

export interface MergeRequestEvent extends Event {
  user: User;
  project: Project;
  repository: Repository;
  object_attributes: {
    id: number;
    iid: number;
    target_branch: string;
    source_branch: string;
    source_project_id: number;
    author_id: number;
    assignee_ids: number[];
    assignee_id: number;
    reviewer_ids: number[];
    title: string;
    created_at: string;
    updated_at: string;
    milestone_id: number | null;
    state: string;
    blocking_discussions_resolved: boolean;
    work_in_progress: boolean;
    first_contribution: boolean;
    merge_status: string;
    target_project_id: number;
    description: string;
    url: string;
    source: Project;
    target: Project;
    last_commit: Commit;
    labels: Label[];
    action: string;
    detailed_merge_status: string;
  };
  labels: Label[];
  changes: {
    updated_by_id: {
      previous: number | null;
      current: number;
    };
    updated_at: {
      previous: string;
      current: string;
    };
    labels: {
      previous: Label[];
      current: Label[];
    };
  };
  assignees: Omit<User, 'email'>[];
  reviewers: Omit<User, 'email'>[];
}
