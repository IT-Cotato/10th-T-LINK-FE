import { LessonDay } from '../../models/room.model';

type LessonDayProps = {
  lessonDayItem: LessonDay;
  isClicked: boolean;
  handleDaysClick: (day: string) => void;
};

const SelectDate = ({ lessonDayItem, isClicked, handleDaysClick }: LessonDayProps) => {
  return (
    <button
      className={`px-3 py-1 rounded-full font-medium text-sm leading-7 ${isClicked ? 'bg-primary_700 text-white' : 'bg-gray-50 text-gray-500'}`}
      onClick={() => handleDaysClick(lessonDayItem.lessonDay)}
    >
      #{lessonDayItem.lessonDay}요일
    </button>
  );
};
export default SelectDate;
