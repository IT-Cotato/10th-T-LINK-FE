import { useEffect, useState } from 'react';
import { hasLesson, hasDeposit } from '../utils/CalendarUtils';
import { getCalendar } from '../api/calendar.api';
import CalendarInfo from '../components/Calendar/CalendarInfo';
import { Cal, Clicked } from '../models/calendar.model';
import DateHandler from '../components/Calendar/DateHandler';
import CalendarGrid from '../components/Calendar/CalendarGrid';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [calData, setCalData] = useState<Cal[]>([]);
  const [clickDate, setClickDate] = useState<Clicked>({
    date: date,
    month: date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
    day: date.getDate(),
    roomname: false,
    subjectAndRooms: false,
  });
  const [roleInfo, setRoleInfo] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('roleInfo');
    setRoleInfo(role || '');
  }, []);

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const res = await getCalendar();
        const calInfo = res.data.data.roomInfo;
        setCalData(calInfo);
        console.log(calInfo);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCalendar();
  }, []);

  useEffect(() => {
    setClickDate({ ...clickDate, roomname: hasDeposit(date, calData), subjectAndRooms: hasLesson(date, calData) });
  }, [calData]);

  const handleDayClick = (day: Date | null) => {
    if (!day) return;

    setClickDate({
      date: day,
      month: day.getMonth() + 1 < 10 ? '0' + (day.getMonth() + 1) : day.getMonth() + 1,
      day: day.getDate() < 10 ? '0' + day.getDate() : day.getDate(),
      roomname: hasDeposit(day, calData),
      subjectAndRooms: hasLesson(day, calData),
    });
  };

  return (
    <div className="px-4">
      <DateHandler date={date} setDate={setDate} />
      <CalendarGrid date={date} data={calData} handleDayClick={handleDayClick} clickDate={clickDate} />
      <CalendarInfo roleInfo={roleInfo} clickDate={clickDate} />
    </div>
  );
};

export default Calendar;
