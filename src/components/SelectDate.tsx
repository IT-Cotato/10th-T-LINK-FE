import { LessonDay } from '../models/room.model';

type LessonDayProps = {
  lessonDayItem: LessonDay;
  isClicked: boolean;
  handleDaysClick: (day: string) => void;
};

const SelectDate = ({ lessonDayItem, isClicked, handleDaysClick }: LessonDayProps) => {
  return (
    <div>
      <button
        className={`px-4 text-white ${isClicked ? 'bg-black' : 'bg-gray-300'}`}
        onClick={() => handleDaysClick(lessonDayItem.lessonDay)} // lessonDay만 전달
      >
        {lessonDayItem.lessonDay}
      </button>
    </div>
  );
};
export default SelectDate;
