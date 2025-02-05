import { Project } from './base/project';
import { Repository } from './base/repository';
import { Commit } from './base/commit';

export interface TagEvent extends Event {
  before: string;
  after: string;
  ref: string;
  checkout_sha: string;
  user_id: number;
  user_name: string;
  user_avatar: string;
  project_id: number;
  project: Project;
  repository: Repository;
  commits: Commit[];
  total_commits_count: number;
}
