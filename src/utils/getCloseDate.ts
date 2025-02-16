// 19일처럼 받았을 때 이것을 가장 가까운 미래 날짜로 변환 (예: 2025-04-19);

const formatDate = (date: Date): string => {
  const yyyy = date.getFullYear();
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // JS에서 월은 0부터 시작
  return `${yyyy}-${mm}-${dd}`;
};

export const getClosestFutureDate = (day: string): string => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const month = today.getMonth() + 1; // 현재 월 (1~12)

  // 입력받은 day를 현재 연도의 같은 월로 설정
  let targetDate = new Date(currentYear, month - 1, Number(day));

  // 이미 지난 날짜라면 다음 연도로 설정
  if (targetDate.getTime() < today.getTime()) {
    targetDate.setFullYear(currentYear + 1);
  }

  return formatDate(targetDate);
};
