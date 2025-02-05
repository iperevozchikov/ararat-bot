import { Event } from './base/event';
import { User } from './base/user';
import { Commit } from './base/commit';
import { Repository } from './base/repository';
import { Environment } from './base/environment';
import { Runner } from './base/runner';

export interface JobEvent extends Event {
  ref: string;
  tag: boolean;
  before_sha: string;
  sha: string;
  build_id: number;
  build_name: string;
  build_stage: string;
  build_status: string;
  build_created_at: string;
  build_started_at: string | null;
  build_finished_at: string | null;
  build_duration: number | null;
  build_allow_failure: boolean;
  build_failure_reason: string;
  retries_count: number;
  pipeline_id: number;
  project_id: number;
  project_name: string;
  user: User;
  commit: Commit;
  repository: Repository;
  runner: Runner;
  environment: Environment | null;
}
