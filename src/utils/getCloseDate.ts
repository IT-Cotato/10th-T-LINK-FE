const formatDate = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // JS에서 월은 0부터 시작
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const getClosestFutureDate = (day: string): string => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  let targetDate = new Date(currentYear, currentMonth, Number(day));

  // 이미 지난 날짜라면 다음 달로 이동
  if (targetDate.getTime() < today.getTime()) {
    targetDate.setMonth(targetDate.getMonth() + 1);

    // 만약 12월을 넘어서면 다음 해로 변경
    if (targetDate.getMonth() === 0) {
      targetDate.setFullYear(currentYear + 1);
    }
  }

  return formatDate(targetDate);
};
