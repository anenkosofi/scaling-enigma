export const getInitialDates = () => {
  const start = new Date();
  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  return [start, end];
};
