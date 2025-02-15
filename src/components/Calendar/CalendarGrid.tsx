import { LessonDaysList } from '../../utils/LessonDaysList';
import depositdot from '../../assets/images/depositdot.png';
import { hasLesson, hasDeposit } from '../../utils/CalendarUtils';
import { Cal, Clicked } from '../../models/calendar.model';
import { groupDatesByWeek } from '../../utils/CalendarUtils';
import user_blue from '../../assets/images/user_blue.png';
import lable from '../../assets/images/lable.png';

type GridProps = {
  date: Date;
  data: Cal[];
  handleDayClick: (day: Date | null) => void;
  clickDate: Clicked;
};

const CalendarGrid = ({ date, data, handleDayClick, clickDate }: GridProps) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const weeks = groupDatesByWeek(firstDay, lastDay);
  const roleInfo = localStorage.getItem('roleInfo');

  const isToday = (day: Date | null) => {
    const today = new Date();
    return (
      day &&
      day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div>
      {/* 요일 */}
      <div className="flex w-full justify-between">
        {LessonDaysList.map((day) => (
          <div className="py-2.5 px-4 text-gray-500 text-base leading-7" key={day.lessonDayId}>
            {day.lessonDay}
          </div>
        ))}
      </div>

      {/* 달력 */}
      <div className="flex flex-col">
        {weeks.map((week, i) => (
          <div key={i} className="flex w-full justify-between">
            {week.map((day, j) => (
              <button
                key={j}
                onClick={() => handleDayClick(day)}
                className={`flex flex-col gap-0.5 items-center py-1.5 px-2.5 text-base leading-7 min-h-[4.0625rem]      
                  ${day?.getTime() === clickDate.date?.getTime() ? 'bg-primary_100 rounded-full text-primary_800 font-semibold' : ''}
                  ${isToday(day) ? 'border-2 border-primary_600 rounded-[100px]' : ''}`}
              >
                {day ? day.getDate() : ''}
                {hasLesson(day, data) ? (
                  <div>
                    {roleInfo === 'TEACHER' ? (
                      <img src={user_blue} className="w-7 h-7" />
                    ) : (
                      <img src={lable} className="w-7 h-7" />
                    )}
                  </div>
                ) : (
                  <div className="w-6 h-full" />
                )}
                {hasDeposit(day, data) ? (
                  <img
                    src={depositdot}
                    className="
                w-1"
                  />
                ) : (
                  <div className="w-1 h-1" />
                )}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
