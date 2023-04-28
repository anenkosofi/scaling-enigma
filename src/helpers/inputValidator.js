export const validateValues = ({ text, start, end }) => {
  const errors = { text: null, start: null, end: null };

  const regex = /^[a-zA-Z0-9\s\u0400-\u04FF']*$/;
  if (!regex.test(text)) {
    errors.text = 'Special symbols like !@#$%^&*()_+= are not allowed.';
  }
  if (!text.trim().length) {
    errors.text = 'This field can not be empty.';
  }

  if (!start.length) {
    errors.start = 'This field is required.';
  }
  if (!end.length) {
    errors.end = 'This field is required.';
  }

  const [startYear] = start.split('-');
  const [endYear] = end.split('-');

  if (parseInt(startYear) > 9999) {
    errors.start = 'Invalid date value.';
  }
  if (parseInt(endYear) > 9999) {
    errors.end = 'Invalid date value.';
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (startDate.getTime() === endDate.getTime()) {
    errors.start = 'Dates can not be the same.';
  }
  if (startDate.getTime() > endDate.getTime()) {
    errors.start = 'Start date can not be greater than end date.';
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (new Date(start) < today) {
    errors.start = 'Start date can not be earlier than today.';
  }

  return errors;
};
