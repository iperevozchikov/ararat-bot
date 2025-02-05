import { Event } from './base/event';
import { Project } from './base/project';
import { User } from './base/user';

export interface DeploymentEvent extends Event {
  status: string;
  status_changed_at: string;
  deployment_id: number;
  deployable_id: number;
  deployable_url: string;
  environment: string;
  project: Project;
  short_sha: string;
  user: User;
  user_url: string;
  commit_url: string;
  commit_title: string;
}
