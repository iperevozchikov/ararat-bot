import { Event } from './base/event';
import { User } from './base/user';
import { Project } from './base/project';

export interface WikiPageEvent extends Event {
  user: User;
  project: Project;
  wiki: Pick<Project, 'web_url' | 'git_ssh_url' | 'git_http_url' | 'path_with_namespace' | 'default_branch'>;
  object_attributes: {
    title: string;
    content: string;
    format: string;
    message: string;
    slug: string;
    url: string;
    action: string;
  };
}
