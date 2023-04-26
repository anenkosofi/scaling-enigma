import { format } from 'date-fns';

export const getDate = date => {
  return format(date, 'd.MM.yyyy HH:mm');
};

export const getInputDate = date => {
  return format(date, 'yyyy-MM-d HH:mm');
};
