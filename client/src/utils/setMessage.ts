import { FilterStatus } from '@types';

export const getMessage = (filter: string, query: string) => {
  const messages = {
    all: 'You do not have any task to do. Add the first!',
    active: 'You do not have active tasks at the moment.',
    completed: 'You do not have completed tasks at the moment.',
    withQuery: 'Your search did not match any tasks.',
  };
  if (query) {
    return messages.withQuery;
  }

  switch (filter) {
    case FilterStatus.ACTIVE:
      return messages.active;

    case FilterStatus.COMPLETED:
      return messages.completed;

    default:
      return messages.all;
  }
};
