import { Clicked } from '../../models/calendar.model';
import CalendarLesson from './CalendarLesson';
import CalendarDeposit from './CalendarDeposit';
import CalendarNolesson from './CalendarNolesson';
import CalendarNolessonStudent from './CalendarNolessonStudent';

type CalendarProps = { clickDate: Clicked; roleInfo: string };

const CalendarInfo = ({ clickDate, roleInfo }: CalendarProps) => {
  return (
    <div>
      <div className="flex text-base pt-4 pb-2">
        {clickDate.month}월 {clickDate.day}일
      </div>
      <div className="flex flex-col gap-2">
        {clickDate.roomname && <CalendarDeposit roomname={clickDate.roomname} type={'calendar'} />}
        {clickDate.subjectAndRooms && <CalendarLesson subjectAndRooms={clickDate.subjectAndRooms} />}
        {!clickDate.roomname && !clickDate.subjectAndRooms && roleInfo === 'TEACHER' && <CalendarNolesson />}
        {!clickDate.roomname && !clickDate.subjectAndRooms && (roleInfo === 'PARENT' || roleInfo === 'STUDENT') && (
          <CalendarNolessonStudent />
        )}
      </div>
    </div>
  );
};

export default CalendarInfo;
