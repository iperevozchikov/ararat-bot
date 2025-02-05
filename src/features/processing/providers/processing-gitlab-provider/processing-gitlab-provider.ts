import { WebhookEvent } from '../../../webhook/models/webhook-event';
import { ProcessedResult } from '../../interfaces/processed-result';
import { CommentEvent } from './interfaces/comment-event';
import { ProcessingProvider } from '../../enums/processing-provider';
import { GitlabEventName } from './enums/gitlab-event-name';
import { MergeRequestEvent } from './interfaces/merge-request-event';
import { ProcessingAbstractProvider } from '../processing-abstract-provider';
import { processCommentHook } from './processors/comment-hook-processor';
import { processMergeRequestHook } from './processors/merge-request-hook-processor';

export class ProcessingGitlabProvider extends ProcessingAbstractProvider {
  process<T>(event: WebhookEvent<T>): ProcessedResult[] | null {
    switch (event.getEventName()) {
      case GitlabEventName.COMMENT_HOOK:
        return processCommentHook(event.getData() as CommentEvent);

      case GitlabEventName.MERGE_REQUEST_HOOK:
        return processMergeRequestHook(event.getData() as MergeRequestEvent);

      default:
        return null;
    }
  }

  getProvider(): string {
    return ProcessingProvider.GITLAB;
  }
}
