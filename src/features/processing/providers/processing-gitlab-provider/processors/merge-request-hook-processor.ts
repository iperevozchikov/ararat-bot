import { MergeRequestEvent } from '../interfaces/merge-request-event';
import { ProcessedResult } from '../../../interfaces/processed-result';
import { getReviewerOrAssigneeUsers } from '../helpers/get-reviewer-or-assignee-users';
import { USERS } from '../../../../user/data';
import { GitlabMergeRequestAction } from '../enums/gitlab-merge-request-action';
import { ProcessingProvider } from '../../../enums/processing-provider';

export function processMergeRequestHook(event: MergeRequestEvent): ProcessedResult[] | null {
  const eventAuthorName = event.user.name ?? event.user.username ?? event.user.email;
  const eventAuthorId = event.user.id.toString();

  const mergeRequestAuthorId = event.object_attributes.author_id.toString();
  const mergeRequestTitle = event.object_attributes.title;
  const mergeRequestUrl = event.object_attributes.url;
  const mergeRequestSourceBranchName = event.object_attributes.source_branch;
  const mergeRequestTargetBranchName = event.object_attributes.target_branch;

  const reviewerOrAssigneeUsers = getReviewerOrAssigneeUsers({
    description: event.object_attributes.description ?? '',
    assigneeIds: event.object_attributes.assignee_ids ?? [],
    reviewerIds: event.object_attributes.reviewer_ids ?? []
  });

  const mergeRequestAuthorUser = USERS
    .find(user => user.getIdentityByProvider(ProcessingProvider.GITLAB)?.id.toString() === mergeRequestAuthorId);

  switch (event.object_attributes.action) {
    case GitlabMergeRequestAction.OPEN:
    case GitlabMergeRequestAction.REOPEN:
      return reviewerOrAssigneeUsers
        .filter(user => user.getIdentityByProvider(ProcessingProvider.GITLAB)?.id !== eventAuthorId)
        .map(user => ({
          message: [
            `*${eventAuthorName}* set you as reviewer to *MR "${mergeRequestTitle}"* (${mergeRequestSourceBranchName} -> ${mergeRequestTargetBranchName})`,
            '*Links:*',
            `- [MR](${mergeRequestUrl})`,
          ].join('\n'),
          user
        }));

    case GitlabMergeRequestAction.APPROVED:
    case GitlabMergeRequestAction.UNAPPROVED:
      const isApproved = event.object_attributes.action === GitlabMergeRequestAction.APPROVED;

      return mergeRequestAuthorUser && mergeRequestAuthorId !== eventAuthorId
        ? [{
          message: [
            `*${eventAuthorName}* ${isApproved ? 'approved' : 'revoked' } *MR "${mergeRequestTitle}"* (${mergeRequestSourceBranchName} -> ${mergeRequestTargetBranchName})`,
            '*Links:*',
            `- [MR](${mergeRequestUrl})`,
          ].join('\n'),
          user: mergeRequestAuthorUser
        }]
        : null;

    case GitlabMergeRequestAction.CLOSE:
      return mergeRequestAuthorUser && mergeRequestAuthorId !== eventAuthorId
        ? [{
          message: [
            `*${eventAuthorName}* closed *MR "${mergeRequestTitle}"* (${mergeRequestSourceBranchName} -> ${mergeRequestTargetBranchName})`,
            '*Links:*',
            `- [MR](${mergeRequestUrl})`,
          ].join('\n'),
          user: mergeRequestAuthorUser,
        }]
        : null;

    case GitlabMergeRequestAction.MERGE:
      return mergeRequestAuthorUser && mergeRequestAuthorId !== eventAuthorId
        ? [{
          message: [
            `*${eventAuthorName}* merged *MR "${mergeRequestTitle}"* to ${mergeRequestTargetBranchName} branch`,
            '*Links:*',
            `- [MR](${mergeRequestUrl})`,
          ].join('\n'),
          user: mergeRequestAuthorUser,
        }]
        : null;

    default:
      return null;
  }
}
