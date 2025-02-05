import { User } from './user';
import { Environment } from './environment';
import { Runner } from './runner';

export interface Build {
  id: number;
  stage: string;
  name: string;
  status: string;
  created_at: string;
  started_at: string | null;
  finished_at: string | null;
  duration: number | null;
  queued_duration: number | null;
  failure_reason: string | null;
  when: string;
  manual: boolean;
  allow_failure: boolean;
  user: User;
  runner: Runner | null;
  artifacts_file:{
    filename: string | null;
    size: number | null;
  };
  environment: Environment;
}
