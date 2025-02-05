import { USERS } from '../../../../user/data';
import { User } from '../../../../user/models/user';
import { ProcessingProvider } from '../../../enums/processing-provider';
import { unique } from '../../../../../common/helpers/unique';

function getReviewerUsersFromDescription(description: string): User[] {
  const nicknames = description.split('\n')
    .filter(line => line.trim().startsWith('Reviewers: '))
    .map(line => line
      .replace('Reviewers: ', '')
      .replace(/@/i, '')
      .split(' ')
      .filter(Boolean)
    )
    .flat();

  return unique(nicknames).reduce(
    (acc: User[], nickname: string) => {
      const user = USERS.find(user => user.getIdentityByProvider(ProcessingProvider.GITLAB)?.nickname === nickname);

      return user ? [...acc, user] as User[] : acc;
    },
    []
  );
}

export function getReviewerOrAssigneeUsers(
  options: {
    description?: string,
    assigneeIds?: (string|number)[],
    reviewerIds?: (string|number)[],
  } = {}
): User[] {
  const foundUsers = [];

  if (options.description) {
    foundUsers.push(...getReviewerUsersFromDescription(options.description));
  }

  const reviewerIdsAndAssigneeIds = unique([
    ...(options.assigneeIds ?? []),
    ...(options.reviewerIds ?? [])
  ]);

  for (const reviewerOrAssigneeId of reviewerIdsAndAssigneeIds) {
    const user = USERS.find(
      user => user.getIdentityByProvider(ProcessingProvider.GITLAB)?.id.toString() === reviewerOrAssigneeId.toString()
    );

    if (!user) {
      continue;
    }

    foundUsers.push(user);
  }

  return foundUsers;
}
