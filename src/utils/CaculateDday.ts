export const CaculateDday = (deadline: string) => {
  const [year, month, day] = deadline.split('.').map(Number);
  const deadlineDate = new Date(year, month - 1, day);

  const today = new Date();

  const timeDiff = deadlineDate.getTime() - today.getTime();

  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return dayDiff;
};
