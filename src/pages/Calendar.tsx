import { useState } from 'react';
import CalendarInfo from '../components/Calendar/CalendarInfo';
import { Clicked } from '../models/calendar.model';
import { hasLesson, hasDeposit } from '../utils/CalendarUtils';
import DateHandler from '../components/Calendar/DateHandler';
import CalendarGrid from '../components/Calendar/CalendarGrid';

const mockData = [
  {
    roomName: '방1',
    subject: '수학',
    depositAt: 23,
    lessonDays: [
      {
        lessonDay: '월',
      },
      {
        lessonDay: '수',
      },
    ],
  },
  {
    roomName: '방2',
    subject: '영어',
    depositAt: 27,
    lessonDays: [
      {
        lessonDay: '토',
      },
    ],
  },
];

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [clickDate, setClickDate] = useState<Clicked>({
    date: date,
    month: date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
    day: date.getDate(),
    roomname: hasDeposit(date, mockData),
    subjectAndRoom: hasLesson(date, mockData),
  });

  const handleDayClick = (day: Date | null) => {
    if (!day) return;

    setClickDate({
      date: day,
      month: day.getMonth() + 1 < 10 ? '0' + (day.getMonth() + 1) : day.getMonth() + 1,
      day: day.getDate() < 10 ? '0' + day.getDate() : day.getDate(),
      roomname: hasDeposit(day, mockData),
      subjectAndRoom: hasLesson(day, mockData),
    });
  };

  return (
    <div className="px-4">
      <DateHandler date={date} setDate={setDate} />
      <CalendarGrid date={date} data={mockData} handleDayClick={handleDayClick} clickDate={clickDate} />
      <CalendarInfo clickDate={clickDate} />
    </div>
  );
};

export default Calendar;
