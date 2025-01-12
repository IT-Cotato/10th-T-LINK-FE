import { Week } from '../utils/WeekList';

type WeekProps = {
  week: Week;
  isClicked: boolean;
  handleWeekClick: (day: string) => void;
};

const SelectDate = ({ week, isClicked, handleWeekClick }: WeekProps) => {
  return (
    <div>
      <button
        className={`px-4 text-white  ${isClicked ? 'bg-black' : 'bg-gray-300'}`}
        onClick={() => handleWeekClick(week.date)}
      >
        {week.date}
      </button>
    </div>
  );
};
export default SelectDate;
