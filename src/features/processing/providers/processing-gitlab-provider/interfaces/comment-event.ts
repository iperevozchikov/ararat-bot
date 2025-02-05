import { Event } from './base/event';
import { User } from './base/user';
import { Project } from './base/project';
import { Repository } from './base/repository';
import { Commit } from './base/commit';
import { Diff } from './base/diff';
import { MergeRequest } from './base/merge-request';
import { Issue } from './base/issue';
import { Snippet } from './base/snippet';
import { MergeRequestEvent } from './merge-request-event';

export interface CommentEvent extends Event {
  user: User;
  project_id: number;
  project: Project;
  repository: Repository;
  object_attributes: {
    id: number;
    note: string;
    noteable_type: string;
    author_id: number;
    created_at: string;
    updated_at: string;
    project_id: number;
    attachment: string | null;
    line_code: string;
    commit_id: string;
    noteable_id: number | null;
    system: boolean;
    st_diff: Diff;
    url: string;
  };
  // noteable_type=Commit
  commit?: Commit;
  // noteable_type=MergeRequest
  merge_request?: MergeRequest & MergeRequestEvent['object_attributes'];
  // noteable_type=Issue
  issue?: Issue;
  // noteable_type=Snippet
  snippet?: Snippet;
}
