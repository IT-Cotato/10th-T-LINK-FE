export const formatDate = (date: Date | null): string => {
  if (!date) return ''; // null인 경우 빈 문자열 반환

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}.${month}.${day}`;
};
