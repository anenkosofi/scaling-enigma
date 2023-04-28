export const validateSymbols = text => {
  const regex = /^[a-zA-Z0-9\s\u0400-\u04FF']*$/;
  return regex.test(text)
    ? null
    : 'Special symbols like !@#$%^&*()_+= are not allowed.';
};

export const validateTextLength = text => {
  return text.trim().length ? null : 'This field can not be empty.';
};

const validateDateLength = date => {
  return date.length ? null : 'This field is required.';
};

const validateDateValue = date => {
  const [year] = date.split('-');
  return parseInt(year) < 10000 ? null : 'Invalid date value.';
};

const validateSameDates = (startDate, endDate) => {
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

export const validateValues = ({ text, start, end }) => {
  const errors = { text: null, start: null, end: null };

  errors.text = validateSymbols(text);

  errors.start = validateDateLength(start);
  errors.end = validateDateLength(end);

  errors.start = validateDateValue(start);
  errors.end = validateDateValue(end);

  errors.start = validateSameDates(start, end);

  return errors;
};
