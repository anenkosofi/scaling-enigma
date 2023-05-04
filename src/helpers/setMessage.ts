import { statusFilters } from '../redux/filters/constants';

export const getMessage = (filter, query) => {
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
    case statusFilters.active:
      return messages.active;

    case statusFilters.completed:
      return messages.completed;

    default:
      return messages.all;
  }
};
