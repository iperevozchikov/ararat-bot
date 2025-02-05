import { Event } from './base/event';
import { KeyValue } from './base/key-value';
import { User } from './base/user';
import { Project } from './base/project';
import { Commit } from './base/commit';
import { MergeRequest } from './base/merge-request';
import { Build } from './base/build';

export interface PipelineEvent extends Event {
  object_attributes:{
    id: number;
    iid: number;
    ref: string;
    tag: boolean;
    sha: string;
    before_sha: string;
    source: string;
    status: string;
    stages: string[];
    created_at: string;
    finished_at: string;
    duration: number;
    variables: KeyValue[];
  };
  merge_request: MergeRequest;
  user: User;
  project: Project;
  commit: Commit;
  source_pipeline: {
    project: Pick<Project, 'id' | 'web_url' | 'path_with_namespace'>;
    pipeline_id: number;
    job_id: number;
  };
  builds: Build[];
}
