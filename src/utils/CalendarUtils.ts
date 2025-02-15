import { Cal } from '../models/calendar.model';
import { LessonDaysList } from './LessonDaysList';

export const hasLesson = (day: Date | null, calData: Cal[]) => {
  if (!day) return false;

  // 클릭한 날짜의 요일 가져오기
  const dayOfWeek = LessonDaysList[day.getDay()].lessonDay;

  // 클릭한 날짜의 요일이 lessonDays에 있는 지 확인
  const subjectAndRooms = calData
    .filter((room) => room.lessonDays.some((lesson) => lesson.lessonDay === dayOfWeek))
    .map((room) => `[${room.subject}] ${room.roomName}`);

  return subjectAndRooms.length > 0 ? subjectAndRooms : false;
};

export const hasDeposit = (day: Date | null, calData: Cal[]) => {
  if (!day) return false;

  // 입금 날짜랑 클릭한 날짜가 같은 지 확인
  const rooms = calData.filter((room) => room.depositAt === day.getDate()).map((room) => room.roomName);
  return rooms.length > 0 ? rooms : false;
};

// 한 주씩 weeks에 넣기
export const groupDatesByWeek = (firstDay: Date, lastDay: Date) => {
  const weeks = [];
  let currentWeek = [];
  let currendDate = new Date(firstDay);

  // 1일 이전 공백 추가
  for (let i = 0; i < firstDay.getDay(); i++) {
    currentWeek.push(null);
  }

  // 1일부터 말일까지 추가
  while (currendDate <= lastDay) {
    currentWeek.push(new Date(currendDate));
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currendDate.setDate(currendDate.getDate() + 1);
  }

  // 말일 이후 공백 추가
  while (currentWeek.length < 7) {
    currentWeek.push(null);
  }

  weeks.push(currentWeek);
  return weeks;
};
