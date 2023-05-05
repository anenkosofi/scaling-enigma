export const validateSymbols = (text: string): string | null => {
  const regex = /^[a-zA-Z0-9\s\u0400-\u04FF']*$/;
  return regex.test(text)
    ? null
    : 'Special symbols like !@#$%^&*()_+= are not allowed.';
};

export const validateTextLength = (text: string): string | null => {
  return text.trim().length ? null : 'This field can not be empty.';
};

const validateDateLength = (date: string): string | null => {
  return date.length ? null : 'This field is required.';
};

const validateDateValue = (date: string): string | null => {
  const [year] = date.split('-');
  return parseInt(year) < 10000 ? null : 'Invalid date value.';
};

const validateSameDates = (
  startDate: string,
  endDate: string
): string | null => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start.getTime() === end.getTime()) {
    return 'Dates can not be the same.';
  }
  if (start.getTime() > end.getTime()) {
    return 'Start date can not be greater than end date.';
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (start < today) {
    return 'Start date can not be earlier than today.';
  }

  return null;
};

type Errors = {
  text: string | null;
  start: string | null;
  end: string | null;
};

export const validateValues = ({
  text,
  start,
  end,
}: {
  text: string;
  start: string;
  end: string;
}) => {
  const errors: Errors = { text: null, start: null, end: null };

  errors.text = validateSymbols(text);

  errors.start = validateDateLength(start);
  errors.end = validateDateLength(end);

  errors.start = validateDateValue(start);
  errors.end = validateDateValue(end);

  errors.start = validateSameDates(start, end);

  return errors;
};
