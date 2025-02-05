import { Event } from './base/event';
import { User } from './base/user';
import { Project } from './base/project';
import { Label } from './base/label';
import { Repository } from './base/repository';
import { Change } from './base/change';

export interface IssueEvent extends Event {
  user: User;
  project: Project;
  object_attributes: {
    id: number;
    title: string;
    assignee_ids: number[];
    assignee_id: number;
    author_id: number;
    project_id: number;
    created_at: string;
    updated_at: string;
    updated_by_id: number;
    last_edited_at: string | null;
    last_edited_by_id: string | null;
    relative_position: number;
    description: string;
    milestone_id: number | null;
    state_id: number;
    confidential: boolean;
    discussion_locked: boolean;
    due_date: string | null;
    moved_to_id: number | null;
    duplicated_to_id: number | null;
    time_estimate: number;
    total_time_spent: number;
    time_change: number;
    human_total_time_spent: string | null;
    human_time_estimate: string | null;
    human_time_change: string | null;
    weight: number | null;
    iid: number;
    url: string;
    state: string;
    action: string;
    severity: string;
    escalation_status: string;
    escalation_policy: {
      id: number;
      name: string;
    };
    labels: Label[];
  };
  repository: Repository;
  assignees: Pick<User, 'name' | 'username' | 'avatar_url'>[];
  assignee: Pick<User, 'name' | 'username' | 'avatar_url'>;
  labels: Label[];
  changes: {
    previous: Change[];
    current: Change[];
  }
}
