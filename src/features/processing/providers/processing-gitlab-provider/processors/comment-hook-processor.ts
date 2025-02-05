import { CommentEvent } from '../interfaces/comment-event';
import { ProcessedResult } from '../../../interfaces/processed-result';
import { GitlabCommentNoteableType } from '../enums/gitlab-comment-noteable-type';
import { getReviewerOrAssigneeUsers } from '../helpers/get-reviewer-or-assignee-users';
import { USERS } from '../../../../user/data';
import { ProcessingProvider } from '../../../enums/processing-provider';
import { unique } from '../../../../../common/helpers/unique';

export function processCommentHook(event: CommentEvent): ProcessedResult[] | null {
  if (event.object_attributes.noteable_type !== GitlabCommentNoteableType.MERGE_REQUEST) {
    return null;
  }

  const comment = event.object_attributes.note.replace(new RegExp('```', 'g'), '');
  const commentAuthor = event.user.name ?? event.user.username ?? event.user.email;
  const commentAuthorId = event.object_attributes.author_id.toString();
  const commentUrl = event.object_attributes.url;
  const mergeRequestUrl = event.merge_request!.url;
  const mergeRequestTitle = event.merge_request!.title || `MR #${event.merge_request!.id}`;
  const mergeRequestAuthorId = event.merge_request!.author_id.toString();

  const reviewerOrAssigneeUsers = getReviewerOrAssigneeUsers({
    description: event.merge_request?.description ?? '',
    assigneeIds: event.merge_request?.assignee_ids ?? [],
    reviewerIds: event.merge_request?.reviewer_ids ?? [],
  });

  const mergeRequestAuthorUser = USERS
    .find(user => user.getIdentityByProvider(ProcessingProvider.GITLAB)?.id.toString() === mergeRequestAuthorId);

  const involvedUsers = mergeRequestAuthorUser
    ? unique([...reviewerOrAssigneeUsers, mergeRequestAuthorUser])
    : reviewerOrAssigneeUsers;

  return involvedUsers
    .filter(user => user.getIdentityByProvider(ProcessingProvider.GITLAB)!.id !== commentAuthorId)
    .map(user => ({
      message: [
        `*${commentAuthor}* leave comment to *MR "${mergeRequestTitle}"*:`,
        '```\n' + comment + '\n```',
        '*Links:*',
        `- [MR](${mergeRequestUrl})`,
        `- [Comment](${commentUrl})`,
      ].join('\n'),
      user,
    }));
}
